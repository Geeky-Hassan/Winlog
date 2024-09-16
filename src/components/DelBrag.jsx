import { Form,Formik,Field } from "formik";
import { useState } from "react";
import { DelBrag } from "../handles/HandleBrag";
const DeleteBrag = () => {
    const [loading, isLoading] = useState(false);
    return (
        <>
        <div className="login-form">
                <Formik
                  initialValues={{
                    brag_title:""
                  }}
                  onSubmit={async (values) => {
                    isLoading(true);
                    try { 
                      await DelBrag(values);
                    } finally {
                      isLoading(false);
                    }
                  }}
                >
                  <Form className="text-format formik-form">
                    <label className="name" htmlFor="brag_title">
                      Brag Title:
                    </label>
                    <br />
                    <Field required id="brag_title" name="brag_title" placeholder="Your brag title..." />
                    
                   
                    <div className="mt-5">
                      <button
                        className="btn border border-slate-400 p-2 w-full text-center rounded-lg hover:bg-indigo-500 hover:text-slate-200"
                        type="submit"
                      >
                        {loading ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
        </>
    )
}
export default DeleteBrag;