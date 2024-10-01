// src/Employment_Creation/App.js
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { getAccessToken } from "@/utils/authUtils.js"; // Import the utility function
import MyFormComponent from "@/MyFormComponent.jsx"; // Update path
import DynamicForm from "@/DynamicForm.jsx"; // Update path
import CredsForm from "@/CredsForm.jsx"; // Update path
import { GlobalStyle, FormArea, Error, HomeButton } from "@/App.styled.jsx"; // Update path
import * as Yup from "yup";

const EmploymentCreationApp = () => {
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
          const response = await axios.get(`${creds.gatewayUrl}${endpoint}`, {
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
    [creds.gatewayUrl, fetchAccessToken]
  );

  useEffect(() => {
    if (initialFormValues && !isContractDetails) {
      fetchSchema(
        `/v1/countries/${initialFormValues.country_code}/employment_basic_information`
      );
    }
  }, [fetchSchema, isContractDetails, initialFormValues]);

  useEffect(() => {
    if (employmentId && isContractDetails) {
      fetchSchema(
        `/v1/countries/${initialFormValues.country_code}/contract_details`
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
          `${creds.gatewayUrl}/v1/employments`,
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
          `${creds.gatewayUrl}/v1/employments/${employmentId}`,
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
                `${creds.gatewayUrl}/v1/employments/${employmentId}/invite`,
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
      <GlobalStyle />
      <div className="App">
        <HomeButton to="/">Home</HomeButton>
        <CredsForm initialValues={creds} onSubmit={handleCredsSubmit} />
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
              <div>Loading...</div>
            ) : submissionStatus ? (
              <FormArea>
                {error && <Error>{error}</Error>}
                <h2>{submissionStatus}</h2>
                {error && <Error>{error}</Error>}
                <button onClick={handleStartOver}>Start Over</button>
              </FormArea>
            ) : (
              <FormArea>
                <h1>Employment Information Form</h1>
                {jsonSchema && (
                  <MyFormComponent
                    jsonSchema={jsonSchema}
                    onSubmit={handleSubmit}
                    isContractDetails={isContractDetails}
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
};

export default EmploymentCreationApp;
