// src/Company_Creation/App.js
import { useState } from "react";
import axios from "axios";
import { getClientCredentialsToken } from "@/utils/auth-utils.js";
import Form from "@/components/form/Form.jsx";
import DynamicForm from "@/components/form/DynamicForm.jsx";
import { CredsForm } from "@/components/CredentialsForm.jsx";
import DisplayResult from "@/utils/DisplayResult.jsx";
import { FormArea, Error, ResultArea, HomeButton } from "@/App.styled.jsx";
import { object, string, boolean } from "yup";

const credentials = {
  clientId: import.meta.env.REACT_APP_CLIENT_ID || "",
  clientSecret: import.meta.env.REACT_APP_CLIENT_SECRET || "",
  refreshToken: import.meta.env.REACT_APP_REFRESH_TOKEN || "",
  gatewayUrl: import.meta.env.REACT_APP_GATEWAY_URL || "",
};

const initialFormFields = [
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

const validationSchema = object({
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

export function CompanyCreationPage() {
  const [companyJsonSchema, setCompanyJsonSchema] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [initialFormValues, setInitialFormValues] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [responseData, setResponseData] = useState(null); // New state to store response data
  const [error, setError] = useState(null);

  const [creds, setCreds] = useState(credentials);

  // Fetch Access Token using the utility function
  async function fetchAccessToken() {
    try {
      const token = await getClientCredentialsToken(
        creds,
        setError,
        setIsLoading
      );
      setAccessToken(token);
      return token;
    } catch {
      // Error is already handled within getClientCredentialsToken
      return null;
    }
  }

  async function fetchSchema(endpoint) {
    setIsLoading(true);
    setError(null);
    const token = await fetchAccessToken();

    if (token) {
      try {
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCompanyJsonSchema(response.data.data);
      } catch (error) {
        console.error("Error fetching JSON schema:", error);
        setError(
          `Error fetching form data: ${
            error.response?.data?.message || error.message
          }`
        );
      } finally {
        setIsLoading(false);
      }
    }
  }

  const handleInitialFormSubmit = (values) => {
    setInitialFormValues(values);
    fetchSchema(
      `/api/v1/companies/schema?country_code=${values.country_code}&form=address_details`
    );
  };

  const handleSubmit = async (jsonValues) => {
    try {
      setError(null);

      // Determine the actions based on the selected checkboxes
      const searchParams = new URLSearchParams();

      const actions = [];
      if (initialFormValues.get_oauth_access_tokens) {
        actions.push("get_oauth_access_tokens");
      }
      if (initialFormValues.send_create_password_email) {
        actions.push("send_create_password_email");
      }

      searchParams.append("actions", actions);
      const actionParam =
        actions.length > 0 ? `?${searchParams.toString()}` : "";

      const payload = {
        ...initialFormValues,
        address_details: {
          ...jsonValues,
        },
        terms_of_service_accepted_at: new Date().toISOString(),
      };

      const postResponse = await axios.post(
        `/api/v1/companies${actionParam}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (postResponse.status === 201) {
        setSubmissionStatus("Company created successfully!");
        setResponseData(postResponse.data.data); // Store the actual response data
      }
    } catch (error) {
      setSubmissionStatus("Request failed.");
      setError(
        `An error occurred: ${error.response?.data?.message || error.message}`
      );
    }
  };

  const handleStartOver = () => {
    setInitialFormValues(null);
    setSubmissionStatus(null);
    setResponseData(null); // Reset response data
    setError(null);
  };

  const handleCredsSubmit = (values) => {
    setCreds(values);
  };

  return (
    <>
      <div className="App">
        <HomeButton to="/">Home</HomeButton>
        <CredsForm initialValues={creds} onSubmit={handleCredsSubmit} />
        {!companyJsonSchema ? (
          <DynamicForm
            fields={initialFormFields}
            validationSchema={validationSchema}
            onSubmit={handleInitialFormSubmit}
            disableSubmit={Object.values(creds).some((value) => !value)}
          />
        ) : (
          <>
            {isLoading ? (
              <div>Loading...</div>
            ) : submissionStatus ? (
              <ResultArea>
                {error && <Error>{error}</Error>}
                <h2>{submissionStatus}</h2>
                {responseData && <DisplayResult data={responseData} />}
                <button onClick={handleStartOver}>Start Over</button>
              </ResultArea>
            ) : (
              <FormArea>
                <h1>Company Information Form</h1>
                {companyJsonSchema && (
                  <Form
                    jsonSchema={companyJsonSchema}
                    onSubmit={handleSubmit}
                  />
                )}
                {error && <Error>{error}</Error>}
              </FormArea>
            )}
          </>
        )}
      </div>
    </>
  );
}
