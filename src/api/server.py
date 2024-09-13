from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app:FastAPI = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'])

@app.get('/')
def index():
    return {'message': 'Welcome to the FastAPI REST API!'}

@app.post('/register')
def register():
    return {'message': 'User registered successfully', 'status':201}




if __name__ == '__main__':
    import uvicorn
    uvicorn.run("server:app", reload=True)