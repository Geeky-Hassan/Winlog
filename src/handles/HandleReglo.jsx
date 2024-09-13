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
    console.log(dat);
    if (dat.status === 200) {
      toast.success(dat.message, {
        duration: 3000,
        position: "top-center",
      });

      route.push(`/user/${dat.username}`);
    }
  } catch (error) {
    toast.error(error.message, {
      duration: 1500,
      position: "top-center",
    });
  }
};

export const HandleLogin = async (values, route) => {
  console.log(values);
  try {
    const resp = await fetch(`http://localhost:3000/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const dat = await resp.json();

    if (dat.status === 200) {
      toast.success(dat.message, {
        duration: 3000,
        position: "top-center",
      });

      route.push(`/user/${dat.username}`);
    }
  } catch (error) {
    toast.error(error.message, {
      duration: 1500,
      position: "top-center",
    });
  }
};
