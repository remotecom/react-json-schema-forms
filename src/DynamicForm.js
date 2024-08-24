import React, { useMemo } from 'react';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';

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
      // Cast values based on field types before submitting
      const castedValues = fields.reduce((acc, field) => {
        switch (field.type) {
          case 'number':
            acc[field.name] = parseFloat(values[field.name]);
            break;
          case 'integer':
            acc[field.name] = parseInt(values[field.name], 10);
            break;
          case 'boolean':
            acc[field.name] = values[field.name] === 'true' || values[field.name] === true;
            break;
          default:
            acc[field.name] = values[field.name];
        }
        return acc;
      }, {});
      
      onSubmit(castedValues);
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

DynamicForm.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string,
      type: PropTypes.string.isRequired,
      defaultValue: PropTypes.any,
    })
  ).isRequired,
  validationSchema: PropTypes.object.isRequired, // Validation schema typically provided by Yup
  onSubmit: PropTypes.func.isRequired,
};

export default DynamicForm;
