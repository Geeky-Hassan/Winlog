import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const GoogleLogin = () => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Google login response:", tokenResponse);
      try {
        const response = await fetch("http://127.0.0.1:8000/google-login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: tokenResponse.access_token }),
        });
        const data = await response.json();
        console.log("Backend response:", data);
        if (response.ok) {
          localStorage.setItem("authToken", data.authToken);
          toast.success("Google login successful!");
          navigate("/");
        } else {
          console.error("Backend error:", data);
          toast.error(data.detail || "Google login failed");
        }
      } catch (error) {
        console.error("Error during Google login:", error);
        toast.error("An error occurred during Google login");
      }
    },
    onError: (error) => {
      console.error("Google login error:", error);
      toast.error("Google login failed");
    },
    scope:
      "email profile https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
  });

  return (
    <button
      onClick={() => login()}
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
