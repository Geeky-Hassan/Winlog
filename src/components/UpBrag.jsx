import { Formik, Field, Form } from "formik";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UpdateBrag as UpdateBrags } from "../handles/HandleBrag";
import { getHashtagSuggestions } from "../services/geminiService";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const UpdateBrag = () => {
  const [loading, setLoading] = useState(false);
  const [generatingHashtags, setGeneratingHashtags] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch previous title from location state or other source
  const previousTitle = location.state?.previousTitle || "";

  const generateHashtagSuggestions = async (title, setFieldValue) => {
    if (!title) return;
    setGeneratingHashtags(true);
    try {
      const hashtags = await getHashtagSuggestions(title);
      setFieldValue("tags", hashtags.join(", "));
    } catch (error) {
      console.error("Error generating hashtag suggestions:", error);
      // You can add a toast notification here to inform the user
    } finally {
      setGeneratingHashtags(false);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append("pTitle", values.pTitle);

    if (values.title) formData.append("title", values.title);
    if (values.desc) formData.append("desc", values.desc);
    if (values.tags) formData.append("tags", values.tags);
    if (values.img) formData.append("img", values.img);
    if (values.start_date) formData.append("start_date", values.start_date);
    if (values.end_date) formData.append("end_date", values.end_date);

    setLoading(true);
    try {
      const response = await UpdateBrags(formData);
      if (response.status_code === 200) {
        toast.success("Brag updated successfully!");
        setTimeout(() => {
          navigate("/brags"); // Redirect to brags page after 2 seconds
        }, 2000); // Redirect to brags page
      } else {
        toast.error(
          response.detail || "Failed to update brag. Please try again."
        );
      }
    } catch (error) {
      console.error("Error updating brag:", error);
      toast.error(
        error.response?.data?.detail ||
          "Failed to update brag. Please try again."
      );
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-xl p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Update Your Brag Document
        </h1>
        <Formik
          initialValues={{
            pTitle: previousTitle,
            title: "",
            desc: "",
            tags: "",
            designation: "",
            img: null,
            start_date: "",
            end_date: "",
          }}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values }) => (
            <Form className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="pTitle"
                >
                  Previous Title:
                </label>
                <Field
                  required
                  id="pTitle"
                  name="pTitle"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Previous brag title..."
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="title"
                >
                  Brag Title:
                </label>
                <Field
                  id="title"
                  name="title"
                  placeholder="Your brag title..."
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="desc"
                >
                  Brag Description:
                </label>
                <ReactQuill
                  theme="snow"
                  value={values.desc}
                  onChange={(content) => setFieldValue("desc", content)}
                  className="mt-1"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="tags"
                >
                  Brag Tags:
                </label>
                <span className="text-xs text-gray-500">
                  Comma separates tags
                </span>
                <Field
                  id="tags"
                  name="tags"
                  placeholder="Creative, Skilled, Technical, Problem Solver"
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  className="mt-2 btn btn-primary"
                  onClick={() =>
                    generateHashtagSuggestions(values.title, setFieldValue)
                  }
                  disabled={generatingHashtags}
                >
                  {generatingHashtags
                    ? "Generating..."
                    : "Generate Hashtag Suggestions"}
                </button>
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="img"
                >
                  Brag Image: (Optional)
                </label>
                <input
                  id="img"
                  name="img"
                  type="file"
                  onChange={(event) => {
                    const file = event.currentTarget.files[0];
                    setFieldValue("img", file);
                  }}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="start_date"
                >
                  Start Date:
                </label>
                <Field
                  id="start_date"
                  name="start_date"
                  placeholder="Your brag start date"
                  type="date"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="end_date"
                >
                  End Date: (Optional, leave empty if ongoing)
                </label>
                <Field
                  id="end_date"
                  name="end_date"
                  placeholder="Your brag end date (optional)"
                  type="date"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <button
                  className="w-full btn btn-primary text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition duration-200"
                  type="submit"
                >
                  {loading ? "Updating..." : "Update"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateBrag;
