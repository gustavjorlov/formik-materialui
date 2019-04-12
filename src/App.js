import React, { Component } from "react";
import { Formik, Field } from "formik";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import * as yup from "yup";

const MICTextField = ({ field, form: { touched, errors }, ...props }) => (
  <TextField
    {...field}
    label={props.label}
    helperText={errors[field.name]}
    error={touched[field.name] && !!errors[field.name]}
    value={field.value}
    onBlur={field.onBlur}
    onChange={field.onChange}
  />
);

class App extends Component {
  render() {
    const validationSchema = yup.object().shape({
      password: yup.string().required(),
      email: yup
        .string()
        .required()
        .email(),
      age: yup.number().min(10, "Age must be numeric and at least 10"),
      computer: yup.string().required()
    });
    return (
      <Card>
        <h2>Hey ho</h2>
        <Formik
          initialValues={{ email: "", password: "", computer: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log("submitting", values);
          }}
        >
          {props => {
            const {
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
            } = props;
            return (
              <React.Fragment>
                <form>
                  <TextField
                    name="email"
                    label="Email"
                    error={errors.email && touched.email}
                    helperText={errors.email && touched.email && errors.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <Field
                    name="age"
                    render={({ field, form }) => {
                      console.log(field, form.errors);
                      return (
                        <TextField
                          {...field}
                          label="Age"
                          error={!!form.errors.age}
                          helperText={form.errors.age}
                        />
                      );
                    }}
                  />
                  <Field
                    name="computer"
                    label="Computer"
                    component={MICTextField}
                  />
                  <Button
                    onClick={handleSubmit}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                </form>
                <pre>{JSON.stringify({ props }, null, 2)}</pre>
              </React.Fragment>
            );
          }}
        </Formik>
      </Card>
    );
  }
}

export default App;
