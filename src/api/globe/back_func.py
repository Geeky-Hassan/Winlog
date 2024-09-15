import os,jwt,shutil


secret_key = os.getenv('secret_key')


def generate_token(data:dict)->str:
    print(f"data: {data}")
    try:
        encoded_token = jwt.encode(data, secret_key, algorithm='HS256')
        return encoded_token
    except jwt.InvalidKeyError:
        print("Invalid secret key provided.")
    except jwt.InvalidAlgorithmError:
        print("Invalid algorithm specified.")
    except jwt.ExpiredSignatureError:
        print("Token has expired.")
    except jwt.InvalidTokenError:
        print("Invalid token.")
    except Exception as e:
        print(f"An unexpected error occurred: {str(e)}")
    return None

def generate_image_path(img_name,img):
    os.makedirs("uploaded_brags",exist_ok=True)
    count = len(os.listdir("uploaded_brags"))
    file_location = os.path.join("uploaded_brags",f"brag_{count+1}{(os.path.splitext(img_name))[1]}")
    with open(file_location,"wb") as f:
        shutil.copyfileobj(img.file,f)

    return file_location


def decode_token(data):
    decoded = jwt.decode(data,secret_key,algorithms=['HS256'])
    return decoded