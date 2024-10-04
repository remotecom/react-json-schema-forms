import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import * as Yup from "yup";

import { getClientCredentialsToken } from "@/utils/auth-utils.js";
import Form from "@/components/ui/form/Form.jsx";
import DynamicForm from "@/components/ui/form/DynamicForm.jsx";
import { CredentialsForm } from "@/components/CredentialsForm.jsx";
import DisplayResult from "@/components/DisplayResult.jsx";
import { HomeButton } from "@/components/HomeButton.jsx";
import { Loading } from "@/components/Loading.jsx";

const credentials = {
  clientId: import.meta.env.REACT_APP_CLIENT_ID || "",
  clientSecret: import.meta.env.REACT_APP_CLIENT_SECRET || "",
  refreshToken: import.meta.env.REACT_APP_REFRESH_TOKEN || "",
  gatewayUrl: import.meta.env.REACT_APP_GATEWAY_URL || "",
};

export function CompanyCreationPage() {
  const [jsonSchema, setJsonSchema] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [companyId, setCompanyId] = useState(null);
  const [isAddressDetails, setIsAddressDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [initialFormValues, setInitialFormValues] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [responseData, setResponseData] = useState(null); // New state to store response data
  const [error, setError] = useState(null);

  const [creds, setCreds] = useState(credentials);

  // Fetch Access Token using the utility function
  const fetchAccessToken = useCallback(async () => {
    try {
      const token = await getClientCredentialsToken(
        creds,
        setError,
        setIsLoading
      );
      setAccessToken(token);
      return token;
    } catch (err) {
      // Error is already handled within getClientCredentialsToken
      return null;
    }
  }, [creds]);

  const fetchSchema = useCallback(
    async (endpoint) => {
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
          setJsonSchema(response.data.data);
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
    },
    [fetchAccessToken]
  );

  useEffect(() => {
    if (initialFormValues && !isAddressDetails) {
      fetchSchema(
        `/api/v1/companies/schema?country_code=${initialFormValues.country_code}&form=address_details`
      );
    }
  }, [fetchSchema, isAddressDetails, initialFormValues]);

  const handleInitialFormSubmit = (values) => {
    setInitialFormValues(values);
  };

  const handleSubmit = async (jsonValues) => {
    try {
      setError(null);

      // Determine the actions based on the selected checkboxes
      const actions = [];
      if (initialFormValues.get_oauth_access_tokens) {
        actions.push("get_oauth_access_tokens");
      }
      if (initialFormValues.send_create_password_email) {
        actions.push("send_create_password_email");
      }

      const actionParam =
        actions.length > 0 ? `?actions=${actions.join("%2C")}` : "";

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
    setCompanyId(null);
    setIsAddressDetails(false);
    setSubmissionStatus(null);
    setResponseData(null); // Reset response data
    setError(null);
  };

  const handleCredsSubmit = (values) => {
    setCreds(values);
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

  const validationSchema = Yup.object({
    company_owner_email: Yup.string()
      .email("Invalid email")
      .required("Required"),
    company_owner_name: Yup.string().required("Required"),
    country_code: Yup.string().required("Required"),
    desired_currency: Yup.string().required("Required"),
    name: Yup.string().required("Required"),
    phone_number: Yup.string().required("Required"),
    tax_number: Yup.string().required("Required"),
    terms_of_service_accepted_at: Yup.string().required("Required"),
    get_oauth_access_tokens: Yup.boolean(),
    send_create_password_email: Yup.boolean(),
  });

  return (
    <>
      <div className="flex justify-between p-5">
        <HomeButton to="/" />
        <CredentialsForm initialValues={creds} onSubmit={handleCredsSubmit} />
      </div>
      {!initialFormValues ? (
        <DynamicForm
          fields={initialFormFields}
          validationSchema={validationSchema}
          onSubmit={handleInitialFormSubmit}
          disableSubmit={Object.values(creds).some((value) => !value)}
        />
      ) : (
        <>
          {isLoading ? (
            <Loading />
          ) : submissionStatus ? (
            <div className="result-area">
              {error && <p className="error">{error}</p>}
              <h2 className="h2">{submissionStatus}</h2>
              {responseData && <DisplayResult data={responseData} />}
              <button className="submit-button" onClick={handleStartOver}>
                Start Over
              </button>
            </div>
          ) : (
            <div className="form-area">
              <h1>Company Information Form</h1>
              {jsonSchema && (
                <Form jsonSchema={jsonSchema} onSubmit={handleSubmit} />
              )}
              {error && <p className="error">{error}</p>}
            </div>
          )}
        </>
      )}
    </>
  );
}
