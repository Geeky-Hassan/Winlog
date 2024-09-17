// ----------------------
// All the imports here
// ----------------------
import { Formik, Field, Form } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HandleLogin, HandleRegister } from "../handles/HandleReglo";
import GoogleLogin from "./GoogleLogin";
import logo from "../assets/footer-logo.png";

// ----------------------

const Reglo = () => {
  const [reglo, setReglo] = useState("Login");
  const [pass, showPass] = useState(false);
  const [loading, isLoading] = useState(false);
  const route = useNavigate();

  return (
    <div className="form-container">
      {/* Left Column - Image and Logo */}
      <div className="left-column">
        <img src={logo} alt="Logo" className=" width-[180px] my-5" />

        <h1>Create Your Brag Doccument</h1>
        <p>Download Your Brag Documents in Multiple Formats</p>
      </div>

      {/* Right Column - Form */}
      <div className="right-column">
        <div className="form-wrapper">
          <h2 className="form-title">
            {reglo === "Login"
              ? "Sign in to your account"
              : "Create a new account"}
          </h2>

          <GoogleLogin />

          <div className="divider">
            <div className="divider-text">
              <span>Or continue with email</span>
            </div>
          </div>

          {reglo === "Login" ? (
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={async (values) => {
                isLoading(true);
                try {
                  await HandleLogin(values, route);
                } finally {
                  isLoading(false);
                }
              }}
            >
              <Form className="mt-8 space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="input-label">
                      Email address
                    </label>
                    <Field
                      required
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="input-label">
                      Password
                    </label>
                    <div className="relative">
                      <Field
                        required
                        id="password"
                        name="password"
                        type={pass ? "text" : "password"}
                        autoComplete="current-password"
                        className="input-field"
                      />
                      <button
                        type="button"
                        onClick={() => showPass(!pass)}
                        className="password-toggle"
                      >
                        {pass ? (
                          <svg
                            className="h-5 w-5 text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="h-5 w-5 text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <button type="submit" className="submit-button">
                    {loading ? "Signing in..." : "Sign in"}
                  </button>
                </div>
              </Form>
            </Formik>
          ) : (
            // Registration form
            <Formik
              initialValues={{ username: "", email: "", password: "" }}
              onSubmit={async (values) => {
                isLoading(true);
                try {
                  await HandleRegister(values, route);
                } finally {
                  isLoading(false);
                }
              }}
            >
              <Form className="mt-8 space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="username" className="input-label">
                      Username
                    </label>
                    <Field
                      required
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="input-label">
                      Email address
                    </label>
                    <Field
                      required
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="input-label">
                      Password
                    </label>
                    <div className="relative">
                      <Field
                        required
                        id="password"
                        name="password"
                        type={pass ? "text" : "password"}
                        autoComplete="new-password"
                        className="input-field"
                      />
                      <button
                        type="button"
                        onClick={() => showPass(!pass)}
                        className="password-toggle"
                      >
                        {pass ? (
                          <svg
                            className="h-5 w-5 text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="h-5 w-5 text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <button type="submit" className="submit-button">
                    {loading ? "Creating account..." : "Create account"}
                  </button>
                </div>
              </Form>
            </Formik>
          )}

          <div className="text-center mt-4">
            <button
              onClick={() => setReglo(reglo === "Login" ? "Register" : "Login")}
              className="toggle-form-button"
            >
              {reglo === "Login"
                ? "Create an account"
                : "Sign in to existing account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reglo;
