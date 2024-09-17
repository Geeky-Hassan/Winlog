from typing import Annotated,Optional
from datetime import datetime
from fastapi import FastAPI,Depends, HTTPException,status,File,UploadFile,Form
from fastapi.staticfiles import StaticFiles
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import and_
from sqlalchemy.orm import Session
from database import session_local,Users,Brags
from globe.back_func import *
import bcrypt

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
app:FastAPI = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'])
app.mount('/uploads/uploaded_brags', StaticFiles(directory="uploaded_brags"), name="uploads")

def get_db():
    db:Session = session_local()
    try:
        yield db
    finally:
        db.close()

@app.get('/')
def index():
    return {'message': 'Welcome to the FastAPI REST API!'}

@app.post('/register')
def register(data: dict, db: Session = Depends(get_db)):
    try:
        """
        there is a monopoly here, the database accepts data in a string format but, the userpass get's encoded into
        the PyBytes that is not acceptable by db. So, we have to decode it to utf-8 and then store it to db.
        """
        print(f"data: {data['password']}")
        hashed_pass = bcrypt.hashpw(data['password'].encode(), bcrypt.gensalt()) # encoding password here
        
        decoded = hashed_pass.decode('utf-8')   # decoding password here
        
        user = Users(user_mail=data['email'], user_name=data['username'], user_pass=decoded) 
        db.add(user)
        db.commit()
        db.refresh(user)
        token = generate_token(data)
        return {"message": "User created successfully", "status": status.HTTP_201_CREATED, "authToken": token}
    except Exception as e:
        print(e)
        return HTTPException(500, "Error creating user")


@app.post('/login')
def login(data: dict, db: Session = Depends(get_db)):
    try:
        # Get the user by email
        user = db.query(Users).filter(Users.user_mail == data['email']).first()
        
        # If user not found, raise an exception
        if user is None:
            return HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email")
        
        # Check the password using bcrypt
        if not bcrypt.checkpw(data['password'].encode(), user.user_pass.encode()):
            return HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid password")
        
        user_info = {
            "id":user.user_id,
            "email":user.user_mail,
            "is_admin":user.is_admin,
            "disabled":user.disabled
        }
        # Generate the token
        token = generate_token(user_info)
        
        # Return the token
        return {"message": "Login successful", "authToken": token, "status": status.HTTP_200_OK}
    
    except Exception as e:
        print(e)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Error logging in")


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    token =decode_token(token)
    return token


@app.get("/g_brags")
async def get_brag(token:Annotated[dict,Depends(get_current_user)],db: Session = Depends(get_db)):
    email = token['email']
    user_id = db.query(Users).filter(Users.user_mail == email).first().user_id 
    brags = db.query(Brags).filter(Brags.users == user_id).all()
    return {"brags": brags}

@app.post("/add_brag")
async def add_brag(
    token: Annotated[dict, Depends(get_current_user)],
    title: str = Form(...),
    desc: str = Form(...),
    tags: list = Form(...),
    designation:str = Form(...),
    start_date: str = Form(...) ,
    end_date: str = Form(...),
    img: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
): 
    email= token['email']
    
    try:
        user = db.query(Users).filter(Users.user_mail == email).first()
    
        
        if user is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized user")
        
        img_path = None
        if img is not None:
            img_path = generate_image_path(img.filename, img)
        
        # Get current datetime
        created_time = datetime.now()
        updated_time = datetime.now()

        brag = Brags(
            brag_name=title,
            brag_desc=desc,
            brag_designation=designation,
            brag_tags=tags,
            brag_img=img_path,
            brag_start_date=start_date,
            brag_end_date=end_date,
            created_time=created_time,
            updated_time=updated_time,
            users=user.user_id
        )
        
        # Try to add, commit, and refresh the brag object
        try:
            db.add(brag)
            db.commit()
            db.refresh(brag)
        except Exception as e:
            # Rollback the session in case of an error
            db.rollback()
            print(f"Error while adding brag: {e}")  # Log the error
            raise HTTPException(detail="Could not create brag at this moment", status_code=status.HTTP_400_BAD_REQUEST)
        
        return {"detail": "Brag created successfully!", "status_code": status.HTTP_201_CREATED, "brag_id":brag.brag_id}
    
    except Exception as e:
        print(e)  # Log the error for debugging
        raise HTTPException(detail="Could not create brag at this moment", status_code=status.HTTP_400_BAD_REQUEST)

from sqlalchemy import and_

@app.put("/u_brag")
async def update_brag(
    token: Annotated[dict, Depends(get_current_user)],
    pTitle: str = Form(...),
    title: str = Form(...),
    desc: str = Form(...),
    tags: list = Form(...),
    designation: str = Form(...),
    start_date: str = Form(...),
    end_date: str = Form(...),
    img: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
): 
    email = token['email']

    try:
        # Fetch the user from the database
        user = db.query(Users).filter(Users.user_mail == email).first()
        
        if user is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized user")
        
        # Find the old brag using the provided title (pTitle)
        old_brag = db.query(Brags).filter(and_(Brags.users == user.user_id, Brags.brag_name == pTitle)).first()

        if old_brag is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Old brag not found")

        # Call the `add_brag` coroutine and pass `db` as an argument
        new_brag = await add_brag(
            token=token,
            title=title,
            desc=desc,
            tags=tags,
            designation=designation,
            start_date=start_date,
            end_date=end_date,
            img=img,
            db=db
        )

        # Get current datetime
        updated_time = datetime.now()

        # Set old brag's `is_soft_deleted` to True and update the `next` field
        db.query(Brags).filter(Brags.brag_id == old_brag.brag_id).update({
            Brags.is_soft_deleted: True,
            Brags.brag_next: new_brag['brag_id'],  # Set next to new_brag's ID
            Brags.updated_time: updated_time
        })

        # Update the new brag with the `prev` field set to the old_brag's ID
        db.query(Brags).filter(Brags.brag_id == new_brag['brag_id']).update({
            Brags.brag_prev: old_brag.brag_id,
            Brags.updated_time: updated_time
        })

        # Commit the changes to the database
        db.commit()

        return {"detail": "Brag updated successfully!", "status_code": status.HTTP_201_CREATED}
    
    except Exception as e:
        print(e)  # Log the error for debugging
        raise HTTPException(detail="Could not update brag at this moment", status_code=status.HTTP_400_BAD_REQUEST)

@app.delete("/d_brags")
async def update_brag(
    token: Annotated[dict, Depends(get_current_user)],
    title: dict,
    db: Session = Depends(get_db)
): 
    email= token['email']
    
    try:
        user = db.query(Users).filter(Users.user_mail == email).first()
        
        if user is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized user")
        now = db.query(Brags).filter(and_(Brags.users == user.user_id, Brags.brag_title == title)).first()
        db.delete(now)
        db.commit()
        
        return {"detail": "Brag deleted successfully!", "status_code": status.HTTP_200_OK}
    
    except Exception as e:
        print(e)  # Log the error for debugging
        raise HTTPException(detail="Could not delete brag at this moment", status_code=status.HTTP_400_BAD_REQUEST)

# ----------------------------
# Revert Brag to previous state
# ----------------------------
@app.delete("/r_brags")
async def revert_brag(
    token: Annotated[dict, Depends(get_current_user)],
    title: dict, 
    db: Session = Depends(get_db)
):
    email = token['email']
    
    try:
        # Fetch the user from the database
        user = db.query(Users).filter(Users.user_mail == email).first()
        print(f"title: {title}")
        if user is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized user")
        
        # Find the current brag by title
        current_brag = db.query(Brags).filter(and_(Brags.users == user.user_id, Brags.brag_name == title['brag_title'])).first()
        
        if current_brag is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Brag not found")
        
        # Check if the current brag has a previous version
        if current_brag.brag_prev is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No previous version to revert to")

        # Find the previous brag using the prev field
        previous_brag = db.query(Brags).filter(Brags.brag_id == current_brag.brag_prev).first()

        if previous_brag is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Previous version not found")

        # Revert the previous brag by setting is_soft_deleted to False
        db.query(Brags).filter(Brags.brag_id == previous_brag.brag_id).update({
            Brags.is_soft_deleted: False
        })

        # Delete the current brag
        db.delete(current_brag)

        # Commit the changes
        db.commit()

        return {"detail": "Brag reverted to previous version successfully!", "status_code": status.HTTP_200_OK}
    
    except Exception as e:
        print(e)  # Log the error for debugging
        raise HTTPException(detail="Could not revert brag at this moment", status_code=status.HTTP_400_BAD_REQUEST)
    

if __name__ == '__main__':
    import uvicorn
    uvicorn.run("server:app", reload=True)