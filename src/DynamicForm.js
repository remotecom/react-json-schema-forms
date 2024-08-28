import React, { useMemo } from 'react';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { FormArea, Label, Error, Hint } from './App.styled.js';

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
          case 'checkbox':
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
    <FormArea>
      <form onSubmit={formik.handleSubmit}>
        {fields.map((field) => (
          <div key={field.name}>
            <Label>{field.label}</Label>
            <input
              type={field.type}
              name={field.name}
              onChange={formik.handleChange}
              value={formik.values[field.name]}
            />
            {formik.errors[field.name] && formik.touched[field.name] ? (
              <Error>{formik.errors[field.name]}</Error>
            ) : null}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </FormArea>
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
