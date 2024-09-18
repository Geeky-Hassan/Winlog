import { Form, Formik, Field } from "formik";
import { useState } from "react";
import { RevertBrag as RevBrag } from "../handles/HandleBrag";
import { useNavigate } from "react-router-dom";

const RevertBrag = () => {
  const [loading, isLoading] = useState(false);
  const route = useNavigate();

  return (
    <div className="= items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Revert Your Brag Document
        </h1>
        <Formik
          initialValues={{ brag_title: "" }}
          onSubmit={async (values) => {
            isLoading(true);
            try {
              const response = await RevBrag(values);
              if (response.success) {
                alert("Brag document reverted successfully.");
                route("/"); // Redirect after successful reversion
              } else {
                alert("Error reverting brag document: " + response.message);
              }
            } catch (error) {
              console.error("Error reverting brag document:", error);
              alert("An error occurred while reverting the brag document.");
            } finally {
              isLoading(false);
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
