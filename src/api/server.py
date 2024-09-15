from typing import Annotated,Optional
from datetime import datetime
from fastapi import FastAPI,Depends, HTTPException,status,File,UploadFile,Form
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
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
        if not user:
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
    print(token)
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
    start_date: str = Form(...) ,
    end_date: str = Form(...),
    img: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
): 
    email= token['email']
    
    try:
        user = db.query(Users).filter(Users.user_mail == email).first()
        print(f"user: {user}")
        
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
        
        return {"detail": "Brag created successfully!", "status_code": status.HTTP_201_CREATED}
    
    except Exception as e:
        print(e)  # Log the error for debugging
        raise HTTPException(detail="Could not create brag at this moment", status_code=status.HTTP_400_BAD_REQUEST)

if __name__ == '__main__':
    import uvicorn
    uvicorn.run("server:app", reload=True)