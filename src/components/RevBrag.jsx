import { Form, Formik, Field } from "formik";
import { useState } from "react";
import { RevertBrag as RevBrag } from "../handles/HandleBrag";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const RevertBrag = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Revert Your Brag Document
        </h1>
        <Formik
          initialValues={{ brag_title: "" }}
          onSubmit={async (values, { setSubmitting }) => {
            setLoading(true);
            try {
              const response = await RevBrag(values);
              if (response.status_code === 200) {
                toast.success("Brag reverted successfully!");
                setTimeout(() => {
                  navigate("/"); // Redirect to home page after 2 seconds
                }, 2000);
              } else {
                toast.error(
                  response.detail || "Failed to revert brag. Please try again."
                );
              }
            } catch (error) {
              console.error("Error reverting brag document:", error);
              toast.error(
                error.response?.data?.detail ||
                  "Failed to revert brag. Please try again."
              );
            } finally {
              setLoading(false);
              setSubmitting(false);
            }
          }}
        >
          {() => (
            <Form className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="brag_title"
                >
                  Brag Title:
                </label>
                <Field
                  required
                  id="brag_title"
                  name="brag_title"
                  placeholder="Enter the title of the brag document to revert..."
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <button className="btn btn-primary w-full" type="submit">
                  {loading ? "Reverting..." : "Revert Brag"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RevertBrag;
