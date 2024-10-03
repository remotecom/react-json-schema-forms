import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  CredsFormWrapper,
  FormArea,
  Label,
  Error,
  ToggleButton,
} from "@/App.styled.jsx";

export function CredsForm({ onSubmit, initialValues }) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    // Retrieve form data from localStorage if available
    const savedValues = JSON.parse(localStorage.getItem("credsFormData"));
    if (savedValues) {
      formik.setValues(savedValues);
    }
  }, []);

  const toggleForm = () => {
    setIsCollapsed(!isCollapsed);
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      clientId: Yup.string().required("Client ID is required"),
      clientSecret: Yup.string().required("Client Secret is required"),
      refreshToken: Yup.string().required("Refresh Token is required"),
      gatewayUrl: Yup.string()
        .url("Invalid URL")
        .required("Gateway URL is required"),
    }),
    onSubmit: (values) => {
      // Save form data to localStorage
      localStorage.setItem("credsFormData", JSON.stringify(values));
      onSubmit(values);
    },
  });

  return (
    <CredsFormWrapper className={isCollapsed ? "collapsed" : ""}>
      <ToggleButton className="toggle" onClick={toggleForm}>
        {isCollapsed ? "Show Credentials" : "Hide Credentials"}
      </ToggleButton>
      {!isCollapsed && (
        <FormArea>
          <form onSubmit={formik.handleSubmit} className="form">
            <div>
              <Label htmlFor="clientId">Client ID</Label>
              <input
                className="input"
                id="clientId"
                name="clientId"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.clientId}
              />
              {formik.touched.clientId && formik.errors.clientId ? (
                <Error>{formik.errors.clientId}</Error>
              ) : null}
            </div>
            <div>
              <Label htmlFor="clientSecret">Client Secret</Label>
              <input
                className="input"
                id="clientSecret"
                name="clientSecret"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.clientSecret}
              />
              {formik.touched.clientSecret && formik.errors.clientSecret ? (
                <Error>{formik.errors.clientSecret}</Error>
              ) : null}
            </div>
            <div>
              <Label htmlFor="refreshToken">Refresh Token</Label>
              <input
                className="input"
                id="refreshToken"
                name="refreshToken"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.refreshToken}
              />
              {formik.touched.refreshToken && formik.errors.refreshToken ? (
                <Error>{formik.errors.refreshToken}</Error>
              ) : null}
            </div>
            <div>
              <Label htmlFor="gatewayUrl">Gateway URL</Label>
              <input
                className="input"
                id="gatewayUrl"
                name="gatewayUrl"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.gatewayUrl}
              />
              {formik.touched.gatewayUrl && formik.errors.gatewayUrl ? (
                <Error>{formik.errors.gatewayUrl}</Error>
              ) : null}
            </div>
            <button className="submit-button" type="submit">
              Save
            </button>
          </form>
        </FormArea>
      )}
    </CredsFormWrapper>
  );
}
