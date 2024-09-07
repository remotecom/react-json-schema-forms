// src/InitialForm.js
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormArea, Label, Button, Error } from '../App.styled.js';

const InitialForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      countryCode: '',
      employeeType: '',
      pricingPlan: '',
    },
    validationSchema: Yup.object({
      countryCode: Yup.string().required('Country code is required'),
      employeeType: Yup.string().required('Employee type is required'),
      pricingPlan: Yup.string().required('Pricing plan is required'),
    }),
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <FormArea>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <Label htmlFor="countryCode">Country Code</Label>
          <input
            id="countryCode"
            name="countryCode"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.countryCode}
          />
          {formik.touched.countryCode && formik.errors.countryCode ? (
            <Error>{formik.errors.countryCode}</Error>
          ) : null}
        </div>
        <div>
          <Label htmlFor="employeeType">Employee Type</Label>
          <input
            id="employeeType"
            name="employeeType"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.employeeType}
          />
          {formik.touched.employeeType && formik.errors.employeeType ? (
            <Error>{formik.errors.employeeType}</Error>
          ) : null}
        </div>
        <div>
          <Label htmlFor="pricingPlan">Pricing Plan</Label>
          <input
            id="pricingPlan"
            name="pricingPlan"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.pricingPlan}
          />
          {formik.touched.pricingPlan && formik.errors.pricingPlan ? (
            <Error>{formik.errors.pricingPlan}</Error>
          ) : null}
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </FormArea>
  );
};

export default InitialForm;
