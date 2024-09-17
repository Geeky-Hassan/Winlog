import { Form,Formik,Field } from "formik";
import { useState } from "react";
import { RevBrag } from "../handles/HandleBrag";
const RevertBrag = () => {
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
                      await RevBrag(values);
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
                        {loading ? "Reverting..." : "Revert"}
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
        </>
    )
}
export default RevertBrag;