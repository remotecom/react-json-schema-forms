import {
  Field as FormikField,
  ErrorMessage as FormikErrorMessage,
} from "formik";
import {
  Label,
  Error,
  Hint,
  LabelRadio,
  FieldsetStyled,
  FieldsetRadioStyled,
  CheckboxField,
  RadioDescription,
} from "./App.styled.jsx";
import * as Dialog from "@radix-ui/react-dialog";

// Helper component to render descriptions with support for help center dialogs
export const Description = ({ description, helpCenter }) => {
  const { callToAction, title, content, error } = helpCenter || {};

  return (
    <Hint>
      {description && typeof description === "string" ? (
        <span dangerouslySetInnerHTML={{ __html: description }} />
      ) : (
        <>{description}</>
      )}
      {callToAction && (
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="DialogTrigger">{callToAction}.</button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="DialogOverlay" />
            <Dialog.Content className="DialogContent">
              <Dialog.Title className="DialogTitle">{title}</Dialog.Title>
              <div dangerouslySetInnerHTML={{ __html: content || error }}></div>
              <br />
              <Dialog.Close asChild>
                <button>Close</button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </Hint>
  );
};

// Field component for text input
function FieldText({ type, name, label, description, meta }) {
  return (
    <div key={name}>
      <Label htmlFor={name}>{label}</Label>
      <FormikField type={type} name={name} id={name} />
      <Description description={description} helpCenter={meta?.helpCenter} />
      <Error>
        <FormikErrorMessage name={name}>
          {(msg) => meta?.["x-jsf-errorMessage"] || msg}
        </FormikErrorMessage>
      </Error>
    </div>
  );
}

// Field component for checkbox input
function FieldCheckbox({ type, name, label, description, meta }) {
  return (
    <div key={name}>
      <CheckboxField>
        <FormikField type={type} name={name} id={name} />
        <Label htmlFor={name}>{label}</Label>
      </CheckboxField>
      <div>
        <Description description={description} helpCenter={meta?.helpCenter} />
        <Error>
          <FormikErrorMessage name={name}>
            {(msg) => meta?.["x-jsf-errorMessage"] || msg}
          </FormikErrorMessage>
        </Error>
      </div>
    </div>
  );
}

// Field component for textarea input
function FieldTextarea({ name, label, description, meta }) {
  return (
    <div key={name}>
      <Label htmlFor={name}>{label}</Label>
      <FormikField as="textarea" name={name} id={name} />
      <Description description={description} helpCenter={meta?.helpCenter} />
      <Error>
        <FormikErrorMessage name={name}>
          {(msg) => meta?.["x-jsf-errorMessage"] || msg}
        </FormikErrorMessage>
      </Error>
    </div>
  );
}

// Field component for select dropdown
function FieldSelect({ name, label, description, options, meta }) {
  return (
    <div key={name}>
      <Label htmlFor={name}>{label}</Label>
      <FormikField as="select" name={name} id={name} placeholder="select...">
        <option disabled value="">
          Select...
        </option>
        {options.map((opt) => (
          <option value={opt.value} key={opt.value}>
            {opt.label}{" "}
          </option>
        ))}
      </FormikField>
      <Description description={description} helpCenter={meta?.helpCenter} />
      <Error>
        <FormikErrorMessage name={name}>
          {(msg) => meta?.["x-jsf-errorMessage"] || msg}
        </FormikErrorMessage>
      </Error>
    </div>
  );
}

// Field component for radio buttons
function FieldRadio({ name, label, description, options, meta }) {
  return (
    <FieldsetRadioStyled key={name}>
      <Label as="legend">{label}</Label>
      <Description description={description} helpCenter={meta?.helpCenter} />
      {options.map((opt) => (
        <span key={opt.value}>
          <LabelRadio>
            <FormikField type="radio" name={name} value={opt.value} />
            {opt.label}
          </LabelRadio>
          <RadioDescription>{opt.description}</RadioDescription>
        </span>
      ))}
      <Error>
        <FormikErrorMessage name={name}>
          {(msg) => meta?.["x-jsf-errorMessage"] || msg}
        </FormikErrorMessage>
      </Error>
    </FieldsetRadioStyled>
  );
}

// Field component for email input
function FieldEmail({ name, label, description, meta }) {
  return (
    <div key={name}>
      <Label htmlFor={name}>{label}</Label>
      <FormikField type="email" name={name} id={name} />
      <Description description={description} helpCenter={meta?.helpCenter} />
      <Error>
        <FormikErrorMessage name={name}>
          {(msg) => meta?.["x-jsf-errorMessage"] || msg}
        </FormikErrorMessage>
      </Error>
    </div>
  );
}

// Field component for hidden fields within a fieldset
function FieldsetHidden({ name, label, description, fields }) {
  if (!fields || fields.length === 0) {
    return null; // Return null if fields are not provided or empty
  }

  return (
    <FieldsetStyled key={name}>
      <legend>{label}</legend>
      {description && <p>{description}</p>}

      {fields.map((field) => {
        if (field.isVisible === false || field.deprecated) {
          return null;
        }

        if (field.type === "hidden") {
          return (
            <FormikField key={field.name} type="hidden" name={field.name} />
          );
        }

        return null;
      })}
    </FieldsetStyled>
  );
}

// General fieldset component
function Fieldset({ name, label, description, fields }) {
  return (
    <FieldsetStyled key={name}>
      <legend>{label}</legend>
      <Description description={description} />

      {fields.map((field) => {
        if (field.isVisible === false) {
          return null;
        }

        const FieldComponent = fieldsMapConfig[field.type];
        return FieldComponent ? (
          <FieldComponent
            key={field.name}
            {...field}
            name={`${name}.${field.name}`}
          />
        ) : (
          <Error>Field type {field.type} not supported</Error>
        );
      })}
    </FieldsetStyled>
  );
}

// Mapping of field types to their respective components
export const fieldsMapConfig = {
  text: FieldText,
  date: FieldText,
  textarea: FieldTextarea,
  select: FieldSelect,
  radio: FieldRadio,
  checkbox: FieldCheckbox,
  email: FieldEmail,
  hidden: FieldsetHidden,
  number: (props) => <FieldText {...props} type="text" />,
  money: (props) => <FieldText {...props} type="text" />,
  fieldset: Fieldset,
};
