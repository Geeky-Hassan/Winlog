import { Form, Formik, Field } from "formik";
import { useState } from "react";
import { DelBrag } from "../handles/HandleBrag";
import { useNavigate } from "react-router-dom";

const DeleteBrag = () => {
  const [loading, isLoading] = useState(false);
  const route = useNavigate();

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Delete Your Brag Document
        </h1>
        <Formik
          initialValues={{ brag_title: "" }}
          onSubmit={async (values) => {
            isLoading(true);
            try {
              const response = await DelBrag(values);
              if (response.success) {
                alert("Brag document deleted successfully.");
                route("/"); // Redirect after successful deletion
              } else {
                alert("Error deleting brag document: " + response.message);
              }
            } catch (error) {
              console.error("Error deleting brag document:", error);
              alert("An error occurred while deleting the brag document.");
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
                  placeholder="Enter the title of the brag document to delete..."
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <button
                  className="w-full bg-red-600 text-white font-semibold py-2 rounded-md hover:bg-red-700 transition duration-200"
                  type="submit"
                >
                  {loading ? "Deleting..." : "Delete Brag"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default DeleteBrag;
