// src/MyFormComponent.js
import React from 'react';
import { createHeadlessForm } from '@remoteoss/json-schema-form';
import { Formik, Form as FormikForm } from 'formik';
import { FormArea, Button, Error } from './App.styled.js';
import { fieldsMapConfig } from './FormFields';
import * as yup from 'yup';

// Function to recursively filter deprecated fields from the schema
function filterDeprecatedFields(properties) {
  const filteredFields = {};

  Object.keys(properties).forEach((key) => {
    const field = properties[key];
    if (!field.deprecated) {
      if (field.properties) {
        field.properties = filterDeprecatedFields(field.properties);
      }
      filteredFields[key] = field;
    }
  });

  return filteredFields;
}

const MyFormComponent = ({ jsonSchema, onSubmit, isContractDetails }) => {
  // Filter out deprecated fields
  const filteredSchema = {
    ...jsonSchema,
    properties: filterDeprecatedFields(jsonSchema.properties),
  };

  const { fields, validationSchema } = createHeadlessForm(filteredSchema);

  const baseValidationSchema = validationSchema || yup.object({});

  // Add common fields and inject custom error messages
  const extendedFields = [
    ...fields.map((field) => ({
      ...field,
      meta: {
        ...field.meta,
        'x-jsf-errorMessage': jsonSchema.properties[field.name]?.['x-jsf-errorMessage'], // Safeguard here
      },
    })),
    {
      name: 'country_code',
      label: 'Country Code',
      type: 'text',
      defaultValue: '',
      validation: yup.string().required('Country Code is required'),
    },
    {
      name: 'type',
      label: 'Type',
      type: 'text',
      defaultValue: '',
      validation: yup.string().required('Type is required'),
    },
    {
      name: 'pricing_plan',
      label: 'Pricing Plan',
      type: 'radio',
      options: [
        { value: 'monthly', label: 'Monthly' },
        { value: 'annually', label: 'Annually' },
      ],
      defaultValue: 'monthly',
      validation: yup.string().required('Pricing Plan is required'),
    },
  ];

  const extendedValidationSchema = baseValidationSchema.concat(
    yup.object().shape({
      country_code: yup.string().required('Country Code is required'),
      type: yup.string().required('Type is required'),
      pricing_plan: yup.string().required('Pricing Plan is required'),
    })
  );

  const handleValidate = async (values) => {
    let errors = {};

    // Custom validations
    if (values.has_seniority_date !== 'yes' && values.has_seniority_date !== 'no') {
      errors.has_seniority_date = jsonSchema.properties.has_seniority_date?.['x-jsf-errorMessage'] || "Expected data to be 'yes' or 'no'.";
    }

    if (!values.job_title || values.job_title.length < 3) {
      errors.job_title = jsonSchema.properties.job_title?.['x-jsf-errorMessage'] || "Job title is invalid.";
    }

    const iso8601Regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!iso8601Regex.test(values.provisional_start_date)) {
      errors.provisional_start_date = jsonSchema.properties.provisional_start_date?.['x-jsf-errorMessage'] || "Provisional start date must be in the ISO8601 format (YYYY-MM-DD).";
    }

    // Validate using Yup schema
    try {
      await extendedValidationSchema.validate(values, { abortEarly: false });
    } catch (yupErrors) {
      yupErrors.inner.forEach((err) => {
        errors[err.path] = jsonSchema.properties[err.path]?.['x-jsf-errorMessage'] || err.message;
      });
    }

    return errors;
  };

  const initialValues = extendedFields.reduce((acc, field) => {
    acc[field.name] = field.defaultValue || '';
    return acc;
  }, {});

  const formValuesToJsonValues = (values, fields) => {
    const fieldValueTransform = {
      text: (val) => val,
      number: (val) => (val === "" ? null : +val),
    };

    const jsonValues = {};

    fields.forEach((field) => {
      if (field.type === 'fieldset' && field.fields) {
        jsonValues[field.name] = formValuesToJsonValues(values[field.name] || {}, field.fields);
      } else {
        const formValue = values[field.name];
        const transformedValue = fieldValueTransform[field.type]?.(formValue) || formValue;
        jsonValues[field.name] = transformedValue;
      }
    });

    return jsonValues;
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={handleValidate}
      onSubmit={(values, { setSubmitting }) => {
        const jsonValues = formValuesToJsonValues(values, extendedFields);

        if (isContractDetails) {
          // Nest the contract details within the appropriate object structure
          const payload = {
            contract_details: jsonValues,
            pricing_plan_details: {
              frequency: values.pricing_plan,
            },
          };
          onSubmit(payload, isContractDetails);
        } else {
          onSubmit(jsonValues, isContractDetails);
        }
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <FormikForm>
          <FormArea>
            {extendedFields.map((field) => {
              if (field.isVisible === false) return null;

              const FieldComponent = fieldsMapConfig[field.type];
              return FieldComponent ? (
                <FieldComponent key={field.name} {...field} />
              ) : (
                <Error>Field type {field.type} not supported</Error>
              );
            })}
            <Button type="submit" disabled={isSubmitting}>Submit</Button>
          </FormArea>
        </FormikForm>
      )}
    </Formik>
  );
};

export default MyFormComponent;
