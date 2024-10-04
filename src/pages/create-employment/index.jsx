import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { getAccessToken } from "@/utils/auth-utils.js";
import Form from "@/components/form/Form.jsx";
import DynamicForm from "@/components/form/DynamicForm.jsx";
import { CredentialsForm } from "@/components/CredentialsForm.jsx";
import * as Yup from "yup";
import { HomeButton } from "../../components/HomeButton";
import { Loading } from "@/components/Loading";

export function EmploymentCreationPage() {
  const [jsonSchema, setJsonSchema] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [employmentId, setEmploymentId] = useState(null);
  const [isContractDetails, setIsContractDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [initialFormValues, setInitialFormValues] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [error, setError] = useState(null);

  const [creds, setCreds] = useState({
    clientId: import.meta.env.REACT_APP_CLIENT_ID || "",
    clientSecret: import.meta.env.REACT_APP_CLIENT_SECRET || "",
    refreshToken: import.meta.env.REACT_APP_REFRESH_TOKEN || "",
    gatewayUrl: import.meta.env.REACT_APP_GATEWAY_URL || "",
  });

  // Fetch Access Token using the utility function
  const fetchAccessToken = useCallback(async () => {
    try {
      const token = await getAccessToken(creds, setError, setIsLoading);
      setAccessToken(token);
      return token;
    } catch (err) {
      // Error is already handled within getAccessToken
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
    if (initialFormValues && !isContractDetails) {
      fetchSchema(
        `/api/v1/countries/${initialFormValues.country_code}/employment_basic_information`
      );
    }
  }, [fetchSchema, isContractDetails, initialFormValues]);

  useEffect(() => {
    if (employmentId && isContractDetails) {
      fetchSchema(
        `/api/v1/countries/${initialFormValues.country_code}/contract_details`
      );
    }
  }, [employmentId, isContractDetails, fetchSchema, initialFormValues]);

  const handleInitialFormSubmit = (values) => {
    setInitialFormValues(values);
  };

  const handleSubmit = async (jsonValues) => {
    try {
      setError(null);

      if (!isContractDetails) {
        const basicInformation = {
          ...jsonValues, // Spread all values from jsonValues
        };

        const postResponse = await axios.post(
          `/api/v1/employments`,
          {
            basic_information: basicInformation, // Pass the dynamically built basic information
            country_code: initialFormValues.country_code,
            type: initialFormValues.type,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (postResponse.status === 201) {
          const newEmploymentId = postResponse.data.data.employment.id;
          setEmploymentId(newEmploymentId);
          setIsContractDetails(true);
        }
      } else {
        const patchResponse = await axios.patch(
          `/api/v1/employments/${employmentId}`,
          {
            contract_details: {
              ...jsonValues,
            },
            pricing_plan_details: {
              frequency: initialFormValues.pricing_plan,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (patchResponse.status === 200) {
          if (initialFormValues.send_self_enrollment_invitation) {
            try {
              const inviteResponse = await axios.post(
                `/api/v1/employments/${employmentId}/invite`,
                {},
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                  },
                }
              );
              setSubmissionStatus("Invite sent successfully!");
            } catch (error) {
              setSubmissionStatus(
                "Contract details and pricing plan submitted successfully, but failed to send invite."
              );
              setError(
                `Failed to send invite: ${
                  error.response?.data?.message || error.message
                }`
              );
            }
          } else {
            setSubmissionStatus(
              "Contract details and pricing plan submitted successfully, invite was not sent as requested."
            );
          }
        }
      }
    } catch (error) {
      setSubmissionStatus("Patch request failed.");
      setError(
        `An error occurred during the patch request: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const handleStartOver = () => {
    setInitialFormValues(null);
    setEmploymentId(null);
    setIsContractDetails(false);
    setSubmissionStatus(null);
    setError(null);
  };

  const handleCredsSubmit = (values) => {
    setCreds(values);
  };

  const initialFormFields = [
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

  const validationSchema = Yup.object({
    country_code: Yup.string().required("Country code is required"),
    type: Yup.string().required("Type of employee is required"),
    pricing_plan: Yup.string().required("Pricing plan is required"),
    send_self_enrollment_invitation: Yup.boolean(),
  });

  return (
    <>
      <div className="App">
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
              <div className="form-area">
                {error && <p className="error">{error}</p>}
                <h2>{submissionStatus}</h2>
                {error && <p className="error">{error}</p>}
                <button className="submit-button" onClick={handleStartOver}>
                  Start Over
                </button>
              </div>
            ) : (
              <div className="form-area">
                <h1>Employment Information Form</h1>
                {jsonSchema && (
                  <Form
                    jsonSchema={jsonSchema}
                    onSubmit={handleSubmit}
                    isContractDetails={isContractDetails}
                  />
                )}
                {error && <p className="error">{error}</p>}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
