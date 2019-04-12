import React, { Component } from "react";
import { Formik } from "formik";
import * as yup from "yup";

class App extends Component {
  render() {
    const validationSchema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email()
    });
    return (
      <div className="App">
        <h2>Hey ho</h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          // validate={values => {
          //   console.log("validating", values);
          // }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log("submitting", values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && errors.email}
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && errors.password}
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

export default App;
