import { Formik, Field, Form } from "formik";
import { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { HandleBrag } from "../handles/HandleBrag";

const AddBrag = () => {
  const [loading, isLoading] = useState(false);
  const route = useNavigate();
  const location = useLocation();

  return (
    <Formik
      initialValues={{
        title: "",
        desc: "",
        img: null,
        start_date: "",
        end_date: "",
      }}
      onSubmit={async (values) => {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("desc", values.desc);
        
        // Only append the image if it exists
        if (values.img) {
          formData.append("img", values.img); // Ensure this is the file input
        }
        
        if(values.start_date){
        formData.append("start_date", values.start_date);
        }
        if(values.end_date){
        formData.append("end_date", values.end_date);
        }

        isLoading(true);
        try {
          await HandleBrag(formData, route,location);
        } finally {
          isLoading(false);
        }
      }}
    >
      {({ setFieldValue }) => (
        <Form className="text-format formik-form">
          <label className="name" htmlFor="title">Brag Title:</label>
          <br />
          <Field required id="title" name="title" placeholder="Your brag title..." />
          <br />
          <label htmlFor="desc">Brag Description:</label>
          <br />
          <Field id="desc" name="desc" placeholder="Your brag description..." type="text" />
          <br />
          <label htmlFor="img">Brag Image: (Optional)</label>
          <br />
          <input
            id="img"
            name="img"
            type="file"
            onChange={(event) => {
              const file = event.currentTarget.files[0];
              setFieldValue("img", file); // Use setFieldValue to update the file input
            }}
          />
          <br />
          <label htmlFor="start_date">Start Date:</label>
          <br />
          <Field id="start_date" name="start_date" placeholder="Your brag start date" type="date" />
          <br />
          <label htmlFor="end_date">End Date: (If going on, leave empty)</label>
          <br />
          <Field id="end_date" name="end_date" placeholder="Your brag end date" type="date" />
          <br />
          <div className="mt-5">
            <button
              className="btn border border-slate-400 p-2 w-full text-center rounded-lg hover:bg-indigo-500 hover:text-slate-200"
              type="submit"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddBrag;