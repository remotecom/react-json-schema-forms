import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { getClientCredentialsToken } from "../utils/authUtils.js";
import DynamicForm from "@/DynamicForm.jsx";
import CredsForm from "@//CredsForm.jsx";
import DisplayResult from "@//utils/DisplayResult.jsx";
import { GlobalStyle, ResultArea, Error, HomeButton } from "@/App.styled.jsx";

const CostCalculatorApp = () => {
  const [countries, setCountries] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const [creds, setCreds] = useState({
    clientId: import.meta.env.REACT_APP_CLIENT_ID || "",
    clientSecret: import.meta.env.REACT_APP_CLIENT_SECRET || "",
    gatewayUrl: import.meta.env.REACT_APP_GATEWAY_URL || "",
    refreshToken: import.meta.env.REACT_APP_REFRESH_TOKEN || "",
  });

  // Fetch Access Token using the utility function
  const fetchAccessToken = useCallback(async () => {
    if (
      !creds.clientId ||
      !creds.clientSecret ||
      !creds.gatewayUrl ||
      !creds.refreshToken
    ) {
      setError("Please fill out and save the credentials form to proceed.");
      setIsLoading(false);
      return null;
    }

    try {
      const token = await getClientCredentialsToken(
        creds,
        setError,
        setIsLoading
      );
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
  }, [creds]);

  // Fetch the list of countries
  const fetchCountries = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const token = await fetchAccessToken();

    if (token) {
      try {
        const response = await axios.get(
          `${creds.gatewayUrl}/v1/cost-calculator/countries`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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
  }, [creds.gatewayUrl, fetchAccessToken]);

  useEffect(() => {
    if (
      creds.gatewayUrl &&
      creds.clientId &&
      creds.clientSecret &&
      creds.refreshToken
    ) {
      fetchCountries();
    } else {
      setIsLoading(false);
    }
  }, [creds, fetchCountries]);

  const handleCredsSubmit = (values) => {
    setCreds(values);
  };

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
        `${creds.gatewayUrl}/v1/cost-calculator/estimation`,
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
        ]
      : [];

  return (
    <>
      <GlobalStyle />
      <div className="App">
        <HomeButton to="/">Home</HomeButton>
        <CredsForm initialValues={creds} onSubmit={handleCredsSubmit} />
        {formFields.length > 0 ? (
          <DynamicForm
            fields={formFields}
            onSubmit={handleSubmit}
            disableSubmit={Object.values(creds).some((value) => !value)}
          />
        ) : (
          <div>
            {isLoading
              ? "Loading..."
              : "Please fill out the credentials form to proceed."}
          </div>
        )}
        {error && <Error>{error}</Error>}
        {result && (
          <ResultArea>
            <h2>Calculation Result</h2>
            <DisplayResult data={result.data} />
            <button onClick={() => setResult(null)}>Start Over</button>
          </ResultArea>
        )}
      </div>
    </>
  );
};

export default CostCalculatorApp;
