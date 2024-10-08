import { object, string, boolean } from "yup";

export const fields = [
  {
    name: "company_owner_email",
    label: "Owner Email",
    type: "text",
    defaultValue: "",
  },
  {
    name: "company_owner_name",
    label: "Owner Name",
    type: "text",
    defaultValue: "",
  },
  {
    name: "country_code",
    label: "Country Code",
    type: "text",
    defaultValue: "GBR",
  },
  {
    name: "desired_currency",
    label: "Desired Currency",
    type: "text",
    defaultValue: "GBP",
  },
  {
    name: "name",
    label: "Company Name",
    type: "text",
    defaultValue: "",
  },
  {
    name: "phone_number",
    label: "Phone Number",
    type: "text",
    defaultValue: "",
  },
  {
    name: "tax_number",
    label: "Tax Number",
    type: "text",
    defaultValue: "",
  },
  {
    name: "terms_of_service_accepted_at",
    label: "Terms of Service Accepted At",
    type: "text",
    defaultValue: new Date().toISOString(),
  },
  {
    name: "get_oauth_access_tokens",
    label: "Get OAuth Access Tokens",
    type: "checkbox",
    defaultValue: false,
  },
  {
    name: "send_create_password_email",
    label: "Send Create Password Email",
    type: "checkbox",
    defaultValue: false,
  },
];

export const validationSchema = object({
  company_owner_email: string().email("Invalid email").required("Required"),
  company_owner_name: string().required("Required"),
  country_code: string().required("Required"),
  desired_currency: string().required("Required"),
  name: string().required("Required"),
  phone_number: string().required("Required"),
  tax_number: string().required("Required"),
  terms_of_service_accepted_at: string().required("Required"),
  get_oauth_access_tokens: boolean(),
  send_create_password_email: boolean(),
});
