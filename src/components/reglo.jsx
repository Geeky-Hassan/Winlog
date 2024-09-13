// ----------------------
// All the imports here
// ----------------------
import {Formik, Field, Form} from "formik";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import {HandleLogin, HandleRegister} from "../handles/HandleReglo";
// ----------------------

const Reglo = () => {
  const [reglo, setReglo] = useState("Login"); // Register and Login state is stored here
  const [pass, showPass] = useState(false); // Password and Show password states are stored here
  const [loading, isLoading] = useState(false); //
  const route = useNavigate();
  const handlePass = () => {
    showPass(!pass);
  };

  return (
    <>
      {/* Login Form */}
      <div className="form">
        <div className="grid justify-center items-center mt-[20%] mb-10 border border-violet-500 mx-4 p-[2%] sm:mt-[10%]">
          {reglo === "Login" ? (
            <>
              <h1 className="font-bold text-format text-xl text-center my-5">Login</h1>
              <div className="login-form">
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  onSubmit={async (values) => {
                    isLoading(true);
                    try {
                      await HandleLogin(values, route);
                    } finally {
                      isLoading(false);
                    }
                  }}
                >
                  <Form className="text-format formik-form">
                    <label className="name" htmlFor="email">
                      Your email:
                    </label>
                    <br />
                    <Field required id="email" name="email" placeholder="Your email..." />
                    <br />
                    <label htmlFor="password">Your password:</label>
                    <br />
                    <Field
                      required
                      id="password"
                      name="password"
                      placeholder="Your password..."
                      type={`${pass ? "text" : "password"}`}
                    />
                    <div>
                      <button onClick={() => showPass(!pass)}>
                        <img
                          alt={""}
                          height={20}
                          src={`${pass ? "/img/show.png" : "/img/hide.png"}`}
                          width={20}
                        />
                      </button>
                    </div>
                    <div className="mt-5">
                      <button
                        className="btn border border-slate-400 p-2 w-full text-center rounded-lg hover:bg-indigo-500 hover:text-slate-200"
                        type="submit"
                      >
                        {loading ? "Logging in..." : "Login"}
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
              <div className="register my-10">
                <button className="btn text-blue-600" onClick={() => setReglo("Register")}>
                  Register here
                </button>
              </div>
            </>
          ) : (
            // --------------------------------------
            // Registeration Form starts here
            // --------------------------------------
            <>
              <h1 className="font-bold text-format text-xl text-center my-5">Register</h1>
              <div className="login-form">
                <Formik
                  initialValues={{
                    username: "",
                    email: "",
                    password: "",
                  }}
                  onSubmit={async (values) => {
                    isLoading(true);
                    try {
                      await HandleRegister(values, route);
                    } finally {
                      isLoading(false);
                    }
                  }}
                >
                  <Form className="text-format formik-form">
                    <label className="name" htmlFor="username">
                      Username:
                    </label>
                    <br />
                    <Field id="username" name="username" placeholder="Username..." />
                    <br />
                    <label className="name" htmlFor="email">
                      Email:
                    </label>
                    <br />
                    <span className="text-slate-500 text-xs">
                      Remember! This email will be used to verify and approve your id.
                    </span>
                    <br />
                    <Field id="email" name="email" placeholder="Your email..." />
                    <br />
                    <label htmlFor="password">Your password:</label>
                    <br />
                    <Field
                      id="password"
                      name="password"
                      placeholder="Your password..."
                      type={`${pass ? "text" : "password"}`}
                    />
                    <div>
                      <button onClick={handlePass}>
                        <img
                          alt={""}
                          height={20}
                          src={`${pass ? "/img/show.png" : "/img/hide.png"}`}
                          width={20}
                        />
                      </button>
                    </div>
                    <div className="mt-5">
                      <button
                        className="btn border border-slate-400 p-2 w-full text-center rounded-lg hover:bg-indigo-500 hover:text-slate-200"
                        disabled={loading}
                        type="submit"
                      >
                        {loading ? "Registering..." : "Register"}
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
              <div className="register my-10">
                <button
                  className="btn text-blue-600"
                  type="button"
                  onClick={() => setReglo("Login")}
                >
                  Login
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Reglo;
