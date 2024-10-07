import { useEffect, useState } from "react";
import axios from "axios";
import { string, number, boolean, object } from "yup";
import { getClientCredentialsToken } from "@/utils/auth-utils.js";
import DynamicForm from "@/components/ui/form/DynamicForm.jsx";
import DisplayResult from "@/components/DisplayResult.jsx";
import { Button } from "@/components/ui/Button.jsx";
import { Loading } from "@/components/Loading.jsx";
import { useCredentials } from "@/domains/shared/credentials/useCredentials.js";

const fields = [
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

const validationSchema = object({
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

export function CostCalculatorPage() {
  const [countries, setCountries] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const { credentials } = useCredentials();

  // Fetch Access Token using the utility function
  async function fetchAccessToken() {
    try {
      const token = await getClientCredentialsToken(setError, setIsLoading);
      setAccessToken(token);
      return token;
    } catch (err) {
      console.error("Error fetching access token:", err);
      setError(
        `Error fetching countries: ${
          err.response?.data?.message || err.message
        }`
      );
      return null;
    }
  }

  // Fetch the list of countries
  async function fetchCountries() {
    setIsLoading(true);
    setError(null);
    const token = await fetchAccessToken();

    if (token) {
      try {
        const response = await axios.get(`/api/v1/cost-calculator/countries`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCountries(response.data.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setError(
          `Error fetching countries: ${
            error.response?.data?.message || error.message
          }`
        );
      } finally {
        setIsLoading(false);
      }
    }
  }

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleCountryChange = (event) => {
    // Clear the error message when the user selects a country
    setError(null);
  };

  const handleSubmit = async (values) => {
    console.log("Form Submitted with values:", values);
    const {
      age,
      annual_gross_salary,
      employment_term,
      country,
      title,
      include_benefits,
      include_cost_breakdowns,
      regional_to_employer_exchange_rate,
    } = values;

    // Find the selected country object from the countries list
    const selectedCountry = countries.find((c) => c.name === country);

    if (!selectedCountry) {
      setError("Invalid country selected");
      return;
    }

    // Extract the currency_slug and region_slug from the selected country
    const currency_slug = selectedCountry.currency.slug;
    const region_slug = selectedCountry.region_slug;

    const payload = {
      employer_currency_slug: currency_slug,
      employments: [
        {
          age,
          annual_gross_salary,
          annual_gross_salary_in_employer_currency: annual_gross_salary,
          employment_term,
          region_slug,
          regional_to_employer_exchange_rate:
            regional_to_employer_exchange_rate.toString(), // Ensure it's a string
          title,
        },
      ],
      include_benefits,
      include_cost_breakdowns,
    };

    try {
      const response = await axios.post(
        `/api/v1/cost-calculator/estimation`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setResult(response.data);
      setError(null);
    } catch (error) {
      console.error("Failed to calculate cost:", error);
      setError("Failed to calculate cost");
    }
  };

  const formFields =
    countries.length > 0
      ? [
          {
            name: "country",
            label: "Country",
            type: "select",
            options: countries.map((c) => ({ value: c.name, label: c.name })),
            defaultValue: "",
            onChange: handleCountryChange, // Attach the onChange handler
          },
          ...fields,
        ]
      : [];

  if (!credentials) {
    return (
      <div className="text-center">
        Please fill out the credentials form to proceed.
      </div>
    );
  }

  if (error) {
    return <p className="text-center error">{error}</p>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {formFields.length > 0 && !result && (
        <DynamicForm
          fields={formFields}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        />
      )}

      {result && (
        <div className="result-area">
          <h2 className="h2">Calculation Result</h2>
          <DisplayResult data={result.data} />
          <Button onClick={() => setResult(null)}>Start Over</Button>
        </div>
      )}
    </>
  );
}
