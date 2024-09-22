import { Form, Formik, Field } from "formik";
import { useState } from "react";
import { DeleteBrag as DelBrag } from "../handles/HandleBrag";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useBrags } from "../BragsContext";

const DeleteBrag = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { refreshData } = useBrags();

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Delete Your Brag Document
        </h1>
        <Formik
          initialValues={{ brag_title: "" }}
          onSubmit={async (values, { setSubmitting }) => {
            setLoading(true);
            try {
              const response = await DelBrag(values.brag_title);
              if (response.status_code === 200) {
                toast.success("Brag deleted successfully!");
                refreshData(); // Refresh the brags data
                setTimeout(() => {
                  navigate("/");
                }, 2000);
              } else {
                toast.error(
                  response.detail || "Failed to delete brag. Please try again."
                );
              }
            } catch (error) {
              console.error("Error deleting brag document:", error);
              toast.error(
                error.response?.data?.detail ||
                  "Failed to delete brag. Please try again."
              );
            } finally {
              setLoading(false);
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
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
                  disabled={isSubmitting || loading}
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
