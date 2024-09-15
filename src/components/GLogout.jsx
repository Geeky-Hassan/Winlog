import GoogleLogout from "react-google-login";
const GLogout = () => {
    const clientId = `${process.env.REACT_APP_GOOGLE_CLIENT_ID}.apps.googleusercontent.com`
    const onSuccess = (res) => {
        console.log('Login Success:', res);
    }
    const onFailure = (res) => {
        console.log('Login failed:', res);
    }
    return (
        <>
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onSuccess={onSuccess}
                
            ></GoogleLogout>
        </div>
        </>
    )
}
export default GLogout;