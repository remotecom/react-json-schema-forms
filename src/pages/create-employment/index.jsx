import { useRef, useState } from "react";
import axios from "axios";
import { object, string, boolean } from "yup";
import { getAccessToken } from "@/utils/auth-utils.js";
import Form from "@/components/ui/form/Form.jsx";
import DynamicForm from "@/components/ui/form/DynamicForm.jsx";
import { Loading } from "@/components/Loading.jsx";
import { Button } from "@/components/ui/Button.jsx";

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

const validationSchema = object({
  country_code: string().required("Country code is required"),
  type: string().required("Type of employee is required"),
  pricing_plan: string().required("Pricing plan is required"),
  send_self_enrollment_invitation: boolean(),
});

export function EmploymentCreationPage() {
  const [jsonSchema, setJsonSchema] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [initialFormValues, setInitialFormValues] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [error, setError] = useState(null);

  const employmentId = useRef();

  // Fetch Access Token using the utility function
  async function fetchAccessToken() {
    try {
      const token = await getAccessToken(setError, setIsLoading);
      setAccessToken(token);
      return token;
    } catch (err) {
      // Error is already handled within getAccessToken
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
    setInitialFormValues(values);
    await fetchSchema(
      `/api/v1/countries/${values.country_code}/employment_basic_information`
    );
  }

  async function handleSubmit(jsonValues) {
    try {
      setError(null);

      if (!employmentId.current) {
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
          employmentId.current = postResponse.data.data.employment.id;
          await fetchSchema(
            `/api/v1/countries/${initialFormValues.country_code}/contract_details`
          );
        }
      } else {
        const patchResponse = await axios.patch(
          `/api/v1/employments/${employmentId.current}`,
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
              await axios.post(
                `/api/v1/employments/${employmentId.current}/invite`,
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
  }

  const handleStartOver = () => {
    employmentId.current = null;
    setInitialFormValues(null);
    setSubmissionStatus(null);
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
      {!initialFormValues ? (
        <DynamicForm
          fields={initialFormFields}
          validationSchema={validationSchema}
          onSubmit={handleInitialFormSubmit}
        />
      ) : (
        <>
          {submissionStatus ? (
            <div className="form-area">
              <h2>{submissionStatus}</h2>
              <Button onClick={handleStartOver}>Start Over</Button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <h2 className="h2">Employment Information Form</h2>
              {jsonSchema && (
                <Form jsonSchema={jsonSchema} onSubmit={handleSubmit} />
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}
