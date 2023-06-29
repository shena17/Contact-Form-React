import React from "react";
import "./App.css";
import * as Yup from "yup";
import { useFormik, Form } from "formik";
import { Grid } from "@mui/material";
import { TextField, Button } from "@mui/material";
import axios from "axios";

function App() {
  // FORMIK
  const INITIAL_FORM_STATE = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  //YUP
  const FORM_VALIDATION = Yup.object({
    name: Yup.string().required("Name Required!"),
    email: Yup.string().required("Email Required!"),
    subject: Yup.string().required("Please enter a Subject"),
    message: Yup.string().required("Please enter a Message"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: FORM_VALIDATION,
    onSubmit: (values) => {
      axios
        .post("http://localhost:8071/sendEmail", {
          name: values.name,
          email: values.email,
          subject: values.subject,
          message: values.message,
        })
        .then((res) => {
          alert("Email sent successfully!");
        })
        .catch((err) => {
          alert("Cannot send email!");
        });
    },
  });

  return (
    <div className="App">
      <div className="containerMain">
        <div className="formContainer">
          <p className="topic mt-2">Contact Us</p>
          <form
            className="login-form container p-4"
            onSubmit={formik.handleSubmit}
          >
            <Grid container spacing={3}>
              <Grid container item xs={12} spacing={3}>
                <Grid item xs={6}>
                  <TextField
                    name="name"
                    label="Your Name"
                    fullWidth
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="email"
                    label="Your Email"
                    fullWidth
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="subject"
                  label="Subject"
                  fullWidth
                  value={formik.values.subject}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.subject && Boolean(formik.errors.subject)
                  }
                  helperText={formik.touched.subject && formik.errors.subject}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="outlined-multiline-static"
                  name="message"
                  label="Message"
                  multiline
                  rows={4}
                  fullWidth
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.message && Boolean(formik.errors.message)
                  }
                  helperText={formik.touched.message && formik.errors.message}
                />
              </Grid>
            </Grid>
            <div className="text-center mt-4">
              <Button
                variant="contained"
                sx={{ padding: "10px 60px", width: "100%" }}
                type="submit"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
