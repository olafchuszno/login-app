import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import cn from "classnames";

import { AuthContext } from "../components/AuthContext.jsx";
import { usePageError } from "../hooks/usePageError.js";

function validateEmail(value) {
  if (!value) {
    return "Email is required";
  }

  const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

  if (!emailPattern.test(value)) {
    return "Email is not valid";
  }
}

export const ResetRequestPage = () => {
  const [error, setError] = usePageError("");
  const { resetPasswordRequest } = useContext(AuthContext);

  return (
    <>
      <Formik
        initialValues={{
          email: "",
        }}
        validateOnMount={true}
        onSubmit={({ email }) => {
          return resetPasswordRequest({ email })
            .then()
            .catch((error) => {
              setError(error.response?.data?.message);
            });
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form className="box">
            <h1 className="title">Reset password</h1>
            <div className="field">
              <label htmlFor="email" className="label">
                Email
              </label>

              <div className="control has-icons-left has-icons-right">
                <Field
                  validate={validateEmail}
                  name="email"
                  type="email"
                  id="email"
                  placeholder="e.g. bobsmith@gmail.com"
                  className={cn("input", {
                    "is-danger": touched.email && errors.email,
                  })}
                />

                <span className="icon is-small is-left">
                  <i className="fa fa-envelope"></i>
                </span>

                {touched.email && errors.email && (
                  <span className="icon is-small is-right has-text-danger">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                )}
              </div>

              {touched.email && errors.email && (
                <p className="help is-danger">{errors.email}</p>
              )}
            </div>
            <div className="field">
              <button
                type="submit"
                className={cn("button is-success has-text-weight-bold", {
                  "is-loading": isSubmitting,
                })}
                disabled={isSubmitting || errors.email}
              >
                Send email
              </button>
            </div>
            Do not have an account? <Link to="/sign-up">Sign up</Link>
          </Form>
        )}
      </Formik>

      {error && <p className="notification is-danger is-light">{error}</p>}
    </>
  );
};
