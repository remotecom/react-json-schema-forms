import { useRef, useState } from "react";
import axios from "axios";
import { object, string, boolean } from "yup";

import { getClientCredentialsToken } from "@/utils/auth-utils.js";
import Form from "@/components/ui/form/Form.jsx";
import DynamicForm from "@/components/ui/form/DynamicForm.jsx";
import DisplayResult from "@/components/DisplayResult.jsx";
import { Loading } from "@/components/Loading.jsx";
import { Button } from "@/components/ui/Button.jsx";

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
  const [jsonSchema, setJsonSchema] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [responseData, setResponseData] = useState(null); // New state to store response data
  const [error, setError] = useState(null);
  const initialFormValues = useRef();
  const accessToken = useRef();

  async function fetchAccessToken() {
    try {
      const token = await getClientCredentialsToken(setError, setIsLoading);
      accessToken.current = token;
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
  }

  async function handleInitialFormSubmit(values) {
    initialFormValues.current = values;
    await fetchSchema(
      `/api/v1/companies/schema?country_code=${values.country_code}&form=address_details`
    );
  }

  async function handleCompanyInformationSubmit(jsonValues) {
    try {
      setError(null);

      // Determine the actions based on the selected checkboxes
      const actions = [];
      if (initialFormValues.current.get_oauth_access_tokens) {
        actions.push("get_oauth_access_tokens");
      }
      if (initialFormValues.current.send_create_password_email) {
        actions.push("send_create_password_email");
      }

      const actionParam =
        actions.length > 0 ? `?actions=${actions.join("%2C")}` : "";

      const payload = {
        ...initialFormValues.current,
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
            Authorization: `Bearer ${accessToken.current}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (postResponse.status === 201) {
        setSubmissionStatus("Company created successfully!");
        setResponseData(postResponse.data.data);
      }
    } catch (error) {
      setSubmissionStatus("Request failed.");
      setError(
        `An error occurred: ${error.response?.data?.message || error.message}`
      );
    }
  }

  const handleStartOver = () => {
    setSubmissionStatus(null);
    setResponseData(null); // Reset response data
    setError(null);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <>
      {!initialFormValues.current ? (
        <DynamicForm
          fields={initialFormFields}
          validationSchema={validationSchema}
          onSubmit={handleInitialFormSubmit}
        />
      ) : (
        <>
          {submissionStatus ? (
            <div className="result-area">
              <h2 className="h2">{submissionStatus}</h2>
              {responseData && <DisplayResult data={responseData} />}
              <Button onClick={handleStartOver}>Start Over</Button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <h2 className="h2">Company Information Form</h2>
              {jsonSchema && (
                <Form
                  jsonSchema={jsonSchema}
                  onSubmit={handleCompanyInformationSubmit}
                />
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}
