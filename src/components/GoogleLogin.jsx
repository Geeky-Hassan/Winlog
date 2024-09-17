import React from "react";
import { useGoogleLogin } from "react-google-login";

const GoogleLogin = () => {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const onSuccess = (res) => {
    console.log("Login Success: currentUser:", res.profileObj);
    // Add your logic here to handle successful login
  };

  const onFailure = (res) => {
    console.log("Login failed: res:", res);
    // Add your logic here to handle failed login
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: "offline",
  });

  return (
    <button
      onClick={signIn}
      className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <img
        className="h-5 w-5 mr-2"
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google logo"
      />
      <span>Continue with Google</span>
    </button>
  );
};

export default GoogleLogin;
