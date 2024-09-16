import { Formik, Field, Form } from "formik";
import { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { UpdateBrags } from "../handles/HandleBrag";

const UpdateBrag = () => {
    const [loading, isLoading] = useState(false);
    const route = useNavigate();
    const location = useLocation();

  return (
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
        formData.append("pTitle", values.pTitle);
        formData.append("title", values.title);
        formData.append("desc", values.desc);
        formData.append("tags", values.tags.split(","));
        formData.append("designation", values.designation);
        
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
          await UpdateBrags(formData, route,location);
        } finally {
          isLoading(false);
        }
      }}
    >
      {({ setFieldValue }) => (
        <Form className="text-format formik-form mx-auto">
          <label className="pTitle" htmlFor="pTitle">Previous Title:</label>
          <br />
          <Field required id="pTitle" name="pTitle" placeholder="Current brag title..." />
          <br />
          <label className="name" htmlFor="title">Brag Title:</label>
          <br />
          <Field required id="title" name="title" placeholder="New brag title..." />
          <br />
          <label htmlFor="desc">Brag Description:</label>
          <br />
          <Field id="desc" name="desc" placeholder="New brag description..." type="text" />
          <br />
          <br />
          <label htmlFor="tags">Brag Tags:</label>
          <br />
          <span>Comma separates tags</span>
          <br />
          <Field id="tags" name="tags" placeholder="Creative, Skilled, Technical, Problem Solver" type="text" />
          <br />
          <label htmlFor="designation">Brag Designation:</label>
          <br />
          <Field id="designation" name="designation" placeholder="New Designation" type="text" />
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
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateBrag;