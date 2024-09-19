import { Formik, Field, Form } from "formik";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AddBrag as HandleBrag } from "../handles/HandleBrag";
import { getHashtagSuggestions } from "../services/geminiService";

const AddBrag = () => {
  const [loading, isLoading] = useState(false);
  const [generatingHashtags, setGeneratingHashtags] = useState(false);
  const route = useNavigate();
  const location = useLocation();

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

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-xl p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Add Your Brag Document
        </h1>
        <Formik
          initialValues={{
            title: "",
            desc: "",
            tags: "",
            designation: "",
            img: null,
            start_date: "",
            end_date: "",
          }}
          onSubmit={async (values) => {
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("desc", values.desc);
            formData.append("tags", values.tags);
            formData.append("designation", values.designation);

            if (values.img) {
              formData.append("img", values.img);
            }

            if (values.start_date) {
              formData.append("start_date", values.start_date);
            }
            if (values.end_date) {
              formData.append("end_date", values.end_date);
            }

            isLoading(true);
            try {
              await HandleBrag(formData, route, location);
            } finally {
              isLoading(false);
            }
          }}
        >
          {({ setFieldValue, values }) => (
            <Form className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="title"
                >
                  Brag Title:
                </label>
                <Field
                  required
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
                <Field
                  required
                  id="desc"
                  name="desc"
                  placeholder="Your brag description..."
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                  required
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
                  htmlFor="designation"
                >
                  Brag Designation:
                </label>
                <Field
                  required
                  id="designation"
                  name="designation"
                  placeholder="Your Designation"
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
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
                  required
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
                  End Date: (If ongoing, leave empty)
                </label>
                <Field
                  id="end_date"
                  name="end_date"
                  placeholder="Your brag end date"
                  type="date"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <button
                  className="w-full btn btn-primary bg-red_violet-500 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition duration-200"
                  type="submit"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddBrag;
