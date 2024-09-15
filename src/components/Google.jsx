import GoogleLogin from "react-google-login";
import { account } from "../auth/appwrite";
const GoogleeLogin = () => {
    console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID)
    const clientId = `${process.env.REACT_APP_GOOGLE_CLIENT_ID}.apps.googleusercontent.com`
    const onSuccess = (res) => {
        console.log('Login Success:', res);
    }
    const onFailure = (res) => {
        console.log('Login failed:', res);
    }
    const handleClick = ()=> {
       const data = account.createOAuth2Session(
            'google',
            'http://localhost:3000/',
            'http://localhost:3000/fail'
        )
        console.log(`data: ${data}`)
    }
    return (
        <>
        <div>
            <button className="border p-4" onClick={handleClick}>Login with Google</button>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'http://localhost:3000'}
                isSignedIn={true}
            />
        </div>
        </>
    )
}
export default GoogleeLogin;