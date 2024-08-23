import React, { useMemo } from 'react';
import { useFormik } from 'formik';

const DynamicForm = ({ fields, validationSchema, onSubmit }) => {
  const initialValues = useMemo(() => {
    return fields.reduce((acc, field) => {
      acc[field.name] = field.defaultValue || '';
      return acc;
    }, {});
  }, [fields]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {fields.map((field) => (
        <div key={field.name}>
          <label>{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            onChange={formik.handleChange}
            value={formik.values[field.name]}
          />
          {formik.errors[field.name] && formik.touched[field.name] ? (
            <div>{formik.errors[field.name]}</div>
          ) : null}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;
