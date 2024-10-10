import { string, number, boolean, object } from "yup";
export const fields = [
  {
    name: "age",
    label: "Age",
    type: "number",
    defaultValue: 30,
  },
  {
    name: "annual_gross_salary",
    label: "Annual Gross Salary in selected country's currency",
    type: "number",
    defaultValue: 150000,
  },
  {
    name: "employment_term",
    label: "Employment Term",
    type: "select",
    options: [
      { value: "fixed", label: "Fixed" },
      { value: "indefinite", label: "Permanent" },
    ],
    defaultValue: "fixed",
  },
  {
    name: "title",
    label: "Title",
    type: "text",
    defaultValue: "SA",
  },
  {
    name: "regional_to_employer_exchange_rate",
    label: "Regional to Employer Exchange Rate",
    type: "text", // Changed to text to ensure it's treated as a string
    defaultValue: "1", // Default value as a string
  },
  {
    name: "include_benefits",
    label: "Include Benefits",
    type: "checkbox",
    defaultValue: false,
  },
  {
    name: "include_cost_breakdowns",
    label: "Include Cost Breakdowns",
    type: "checkbox",
    defaultValue: false,
  },
];

export const validationSchema = object({
  age: number().required("Age is required"),
  annual_gross_salary: number().required("Salary is required"),
  employment_term: string().required("Employment term is required"),
  title: string().required("Title is required"),
  regional_to_employer_exchange_rate: string().required(
    "Exchange rate is required"
  ),
  include_benefits: boolean(),
  include_cost_breakdowns: boolean(),
});
