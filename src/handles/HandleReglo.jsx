import toast from "react-hot-toast";

export const HandleRegister = async (value, route) => {
  try {
    const resp = await fetch(`http://127.0.0.1:8000/register`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });
    const dat = await resp.json();
    
    if (dat.status == 201) {
      toast.success(dat.message, {
        duration: 3000,
        position: "top-center",
      });
      localStorage.setItem("authToken",dat.authToken)
      route(`/`);
    }
  } catch (error) {
    toast.error(error.message, {
      duration: 3000,
      position: "top-center",
    });
  }
};

export const HandleLogin = async (values, route) => {
  console.log(values);
  try {
    const resp = await fetch(`http://127.0.0.1:8000/login`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const dat = await resp.json();
    console.log(dat);

    if (resp.status_code==200) { // Check if the response is successful
      toast.success(dat.message, {
        duration: 3000,
        position: "top-center",
      });
      
      localStorage.setItem("authToken", dat.authToken);
      route(`/`);
    } else {
      // Handle different error responses
      if (resp.status_code === 401) {
        toast.error(dat.detail || "Unauthorized: Invalid email or password", {
          duration: 1500,
          position: "top-center",
        });
      } else if (resp.status_code === 400) {
        toast.error(dat.detail || "Bad Request: Missing email or password", {
          duration: 1500,
          position: "top-center",
        });
      } else {
        toast.error(dat.detail || "An unexpected error occurred", {
          duration: 1500,
          position: "top-center",
        });
      }
    }
  } catch (error) {
    console.log(error);
    toast.error("An error occurred while logging in", {
      duration: 1500,
      position: "top-center",
    });
  }
}
