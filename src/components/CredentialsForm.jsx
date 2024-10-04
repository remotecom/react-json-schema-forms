import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerClose,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

export function CredsForm({ onSubmit, initialValues }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    // Retrieve form data from localStorage if available
    const savedValues = JSON.parse(localStorage.getItem("credsFormData"));
    if (savedValues) {
      formik.setValues(savedValues);
    }
  }, []);

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
      setIsCollapsed(false);
      onSubmit(values);
    },
  });

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Show Credentials</Button>
      </DrawerTrigger>

      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Remote API credentials</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="form-area" style={{ margin: 0, padding: 0 }}>
              <form onSubmit={formik.handleSubmit} className="form">
                <div>
                  <label className="block mb-1" htmlFor="clientId">
                    Client ID
                  </label>
                  <input
                    className="input"
                    id="clientId"
                    name="clientId"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.clientId}
                  />
                  {formik.touched.clientId && formik.errors.clientId ? (
                    <p className="error">{formik.errors.clientId}</p>
                  ) : null}
                </div>
                <div>
                  <label className="block mb-1" htmlFor="clientSecret">
                    Client Secret
                  </label>
                  <input
                    className="input"
                    id="clientSecret"
                    name="clientSecret"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.clientSecret}
                  />
                  {formik.touched.clientSecret && formik.errors.clientSecret ? (
                    <p className="error">{formik.errors.clientSecret}</p>
                  ) : null}
                </div>
                <div>
                  <label className="block mb-1" htmlFor="refreshToken">
                    Refresh Token
                  </label>
                  <input
                    className="input"
                    id="refreshToken"
                    name="refreshToken"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.refreshToken}
                  />
                  {formik.touched.refreshToken && formik.errors.refreshToken ? (
                    <p className="error">{formik.errors.refreshToken}</p>
                  ) : null}
                </div>
                <div>
                  <label className="block mb-1" htmlFor="gatewayUrl">
                    Gateway URL
                  </label>
                  <input
                    className="input"
                    id="gatewayUrl"
                    name="gatewayUrl"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.gatewayUrl}
                  />
                  {formik.touched.gatewayUrl && formik.errors.gatewayUrl ? (
                    <p className="error">{formik.errors.gatewayUrl}</p>
                  ) : null}
                </div>
                <DrawerClose asChild>
                  <button className="submit-button" type="submit">
                    Save
                  </button>
                </DrawerClose>
              </form>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
