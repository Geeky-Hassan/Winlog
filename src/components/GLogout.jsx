import GoogleLogout from "react-google-login";
const GLogout = () => {
  const clientId = `${process.env.REACT_APP_GOOGLE_CLIENT_ID}.apps.googleusercontent.com`;

  return (
    <>
      <div>
        <GoogleLogout clientId={clientId} buttonText="Logout"></GoogleLogout>
      </div>
    </>
  );
};
export default GLogout;
