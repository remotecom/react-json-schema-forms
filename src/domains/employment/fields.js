import { object, string, boolean } from "yup";

export const fields = [
  {
    name: "country_code",
    label: "Country Code",
    type: "text",
    defaultValue: "",
  },
  {
    name: "type",
    label: "Type of Employee",
    type: "select",
    options: [
      { value: "employee", label: "Employee" },
      { value: "contractor", label: "Contractor" },
    ],
    defaultValue: "",
  },
  {
    name: "pricing_plan",
    label: "Pricing Plan",
    type: "select",
    options: [
      { value: "monthly", label: "Monthly" },
      { value: "annually", label: "Annually" },
    ],
    defaultValue: "",
  },
  {
    name: "send_self_enrollment_invitation",
    label: "Send Self-Enrollment Invitation",
    type: "checkbox",
    defaultValue: false,
  },
];

export const validationSchema = object({
  country_code: string().required("Country code is required"),
  type: string().required("Type of employee is required"),
  pricing_plan: string().required("Pricing plan is required"),
  send_self_enrollment_invitation: boolean(),
});
