import toast from "react-hot-toast";

export const HandleBrag = async (values, route,location) => {
  const token = localStorage.getItem("authToken"); // Retrieve the token from local storage

  try {
    const resp = await fetch(`http://127.0.0.1:8000/add_brag`, {
      method: "POST",
      cache: "no-cache",
      headers: {
        'Authorization': `Bearer ${token}`, // Set the Authorization header
      },
      body: values,
    });

    const dat = await resp.json();
    console.log(dat);

    // Check the response status
    if (resp.ok) { // Successful response (status code 200-299)
      toast.success(dat.detail || "Brag created successfully!", {
        duration: 3000,
        position: "top-center",
      });
      
      route(location.pathname, {replace:true}); // Redirect to another route
    } else {
      // Handle specific error responses
      if (resp.status === 401) {
        toast.error(dat.detail || "Unauthorized: Please log in again.", {
          duration: 1500,
          position: "top-center",
        });
      } else if (resp.status === 400) {
        toast.error(dat.detail || "Bad Request: Please check your input.", {
          duration: 1500,
          position: "top-center",
        });
      } else {
        toast.error(dat.detail || "An unexpected error occurred. Please try again.", {
          duration: 1500,
          position: "top-center",
        });
      }
    }
  } catch (error) {
    console.log(error);
    toast.error("An error occurred while submitting the brag. Please try again.", {
      duration: 1500,
      position: "top-center",
    });
  }
};

export const GetBrags = async () =>{
    const token = localStorage.getItem("authToken"); // Retrieve the token from local storage

    try {
      const resp = await fetch(`http://127.0.0.1:8000/g_brags`, {
        method: "GET",
        cache: "no-cache",
        headers: {
          'Authorization': `Bearer ${token}`, // Set the Authorization header
        },
      });

      const dat = await resp.json();

      return dat;

    } catch (error) {
      console.log(error);
      toast.error("An error occurred while fetching brags. Please try again.", {
        duration: 1500,
        position: "top-center",
      });
    }
}
export const UpdateBrags = async (values, route,location) =>{
  const token = localStorage.getItem("authToken"); // Retrieve the token from local storage

  try {
    const resp = await fetch(`http://127.0.0.1:8000/u_brag`, {
      method: "put",
      cache: "no-cache",
      headers: {
        'Authorization': `Bearer ${token}`, // Set the Authorization header
      },
      body: values,
    });

    const dat = await resp.json();
    console.log(dat);

    // Check the response status
    if (resp.ok) { // Successful response (status code 200-299)
      toast.success(dat.detail || "Brag updated successfully!", {
        duration: 3000,
        position: "top-center",
      });
      
      route(location.pathname, {replace:true}); // Redirect to another route
    } else {
      // Handle specific error responses
      if (resp.status === 401) {
        toast.error(dat.detail || "Unauthorized: Please log in again.", {
          duration: 1500,
          position: "top-center",
        });
      } else if (resp.status === 400) {
        toast.error(dat.detail || "Bad Request: Please check your input.", {
          duration: 1500,
          position: "top-center",
        });
      } else {
        toast.error(dat.detail || "An unexpected error occurred. Please try again.", {
          duration: 1500,
          position: "top-center",
        });
      }
    }
  } catch (error) {
    console.log(error);
    toast.error("An error occurred while submitting the brag. Please try again.", {
      duration: 1500,
      position: "top-center",
    });
  }
}

export const DelBrag = async (values) =>{
      const token = localStorage.getItem("authToken"); // Retrieve the token from local storage
      
      try {
        const resp = await fetch(`http://127.0.0.1:8000/d_brags`, {
          method: "DELETE",
          cache: "no-cache",
          headers: {
            'Authorization': `Bearer ${token}`, // Set the Authorization header
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
  
        const dat = await resp.json();
        console.log(`dat got: ${dat}`);
  
      if (resp.ok) { // Successful response (status code 200-299)
        toast.success(dat.detail || "Brag deleted successfully!", {
          duration: 3000,
          position: "top-center",
        });
      } else {
        // Handle specific error responses
        if (resp.status === 401) {
          toast.error(dat.detail || "Unauthorized: Please log in again.", {
            duration: 1500,
            position: "top-center",
          });
        } else if (resp.status === 404) {
          toast.error(dat.detail || "Not Found: The brag does not exist.", {
            duration: 1500,
            position: "top-center",
          });
        } else if (resp.status === 400) {
          toast.error(dat.detail || "Bad Request: Please check your input.", {
            duration: 1500,
            position: "top-center",
          });
        } else {
          toast.error(dat.detail || "An unexpected error occurred. Please try again.", {
            duration: 1500,
            position: "top-center",
          });
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while deleting the brag. Please try again.", {
        duration: 1500,
        position: "top-center",
      });
    }
  }
export const RevBrag = async (values) =>{
      const token = localStorage.getItem("authToken"); // Retrieve the token from local storage
      
      try {
        const resp = await fetch(`http://127.0.0.1:8000/r_brags`, {
          method: "DELETE",
          cache: "no-cache",
          headers: {
            'Authorization': `Bearer ${token}`, // Set the Authorization header
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
  
        const dat = await resp.json();
        console.log(`dat got: ${dat}`);
  
      if (resp.ok) { // Successful response (status code 200-299)
        toast.success(dat.detail || "Brag reverted successfully!", {
          duration: 3000,
          position: "top-center",
        });
      } else {
        // Handle specific error responses
        if (resp.status === 401) {
          toast.error(dat.detail || "Unauthorized: Please log in again.", {
            duration: 1500,
            position: "top-center",
          });
        } else if (resp.status === 404) {
          toast.error(dat.detail || "Not Found: The brag does not exist.", {
            duration: 1500,
            position: "top-center",
          });
        } else if (resp.status === 400) {
          toast.error(dat.detail || "Bad Request: Please check your input.", {
            duration: 1500,
            position: "top-center",
          });
        } else {
          toast.error(dat.detail || "An unexpected error occurred. Please try again.", {
            duration: 1500,
            position: "top-center",
          });
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while reverting the brag. Please try again.", {
        duration: 1500,
        position: "top-center",
      });
    }
  }