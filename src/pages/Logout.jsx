import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = () => {
      try {
        // Remove the auth token from localStorage
        localStorage.removeItem('authToken');

        // Redirect the user to the login page
        navigate('/login');
        window.location.reload();
      } catch (error) {
        console.error('Error logging out:', error);
      }
    };

    logoutUser();
  }, [navigate]);

  return (
    <div className="text-center my-8">
      <h2 className="text-2xl font-bold mb-4">Logging you out...</h2>
      <p className="text-gray-500">Please wait while we log you out.</p>
    </div>
  );
};

export default Logout;