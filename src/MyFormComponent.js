import React, { useEffect, useState } from "react";
import { modify, createHeadlessForm } from "@remoteoss/json-schema-form";
import {
  Formik,
  Form as FormikForm,
  Field as FormikField,
  ErrorMessage as FormikErrorMessage,
} from "formik";
import {
  GlobalStyle,
  CreditsStyled,
  Disclaimer,
  FormArea,
  Label,
  Hint,
  Error,
} from "./App.styled.js";
import { fieldsMapConfig } from "./FormFields";

const COMPONENT_KEY = "Component";

// Function to check if a field has a forced value
function hasForcedValue(field) {
  return (
    field.const !== undefined &&
    field.const === field.default &&
    !field.options
  );
}

// Function to get initial values for the form fields
function getPrefilledValues(fields, initialValues) {
  return fields.reduce((acc, field) => {
    const initialValue = initialValues[field.name];
    if (field.inputType === "fieldset") {
      return {
        ...acc,
        [field.name]: getPrefilledValues(field.fields, initialValue),
      };
    }
    return { ...acc, [field.name]: initialValue || "" };
  }, {});
}

// Function to transform form values to JSON values according to the schema
function formValuesToJsonValues(values, fields) {
  const fieldValueTransform = {
    text: (val) => val,
    number: (val) => (val === "" ? val : +val),
    money: (val) => (val === "" ? null : val * 100),
    boolean: (val) => (val === "true" || val === true),
  };

  const jsonValues = {};

  fields.forEach(({ name, inputType }) => {
    const formValue = values[name];
    const transformedValue = fieldValueTransform[inputType]?.(formValue);
    const valueToUse =
      transformedValue === null || transformedValue !== undefined
        ? transformedValue
        : formValue;

    jsonValues[name] = valueToUse;
  });

  return jsonValues;
}

export default function MyFormComponent({ jsonSchema, onSubmit, isContractDetails }) {
  const [modifiedSchema, setModifiedSchema] = useState(null);

  useEffect(() => {
    // Modify the schema as needed
    const { schema: modified, warnings } = modify(jsonSchema, {
      fields: {
        // Add any custom modifications here if necessary
      },
    });

    setModifiedSchema(modified);

    if (warnings && warnings.length) {
      console.warn("Schema modification warnings:", warnings);
    }
  }, [jsonSchema]);

  if (!modifiedSchema) {
    return <div>Loading form...</div>;
  }

  const API_STORED_VALUES = {}; // Set this with any stored values if available

  const { fields, handleValidation, error } = createHeadlessForm(
    modifiedSchema,
    {
      initialValues: API_STORED_VALUES,
    }
  );

  const initialValues = getPrefilledValues(fields, API_STORED_VALUES);

  function handleValidate(formValues) {
    const jsonValues = formValuesToJsonValues(formValues, fields);
    const { formErrors } = handleValidation(jsonValues);
    return formErrors; // Returned errors will be used by Formik
  }

  function handleFormSubmit(formValues) {
    console.log('Form values before casting:', formValues);
    const jsonValues = formValuesToJsonValues(formValues, fields);
    console.log('Form values after casting:', jsonValues);
    onSubmit(jsonValues);
  }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validate={handleValidate}
        onSubmit={handleFormSubmit}
      >
        {({ isSubmitting, errors }) => (
          <FormikForm>
            <FormArea>
              {fields.map((field) => {
                if (field.isVisible === false || field.deprecated) {
                  return null; // Skip hidden or deprecated fields
                }

                if (hasForcedValue(field)) {
                  // Skip fields with forced values or implement custom logic
                  return null; // Customize or omit this based on your needs
                }

                const FieldComponent =
                  field[COMPONENT_KEY] || fieldsMapConfig[field.inputType];

                return FieldComponent ? (
                  <FieldComponent key={field.name} {...field} />
                ) : (
                  <Error>Field type {field.inputType} not supported</Error>
                );
              })}

              <button type="submit" aria-disabled={isSubmitting}>
                Submit
              </button>
            </FormArea>
          </FormikForm>
        )}
      </Formik>
      <GlobalStyle />
    </div>
  );
}
