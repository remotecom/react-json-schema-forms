import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import MyFormComponent from './MyFormComponent';
import DynamicForm from './DynamicForm';
import { GlobalStyle, FormArea, Error } from './App.styled.js';
import * as Yup from 'yup';

const getAccessToken = (() => {
  let cachedToken = null;
  let tokenExpiry = null;

  return async () => {
    if (cachedToken && tokenExpiry && new Date() < tokenExpiry) {
      return cachedToken;
    }

    const clientId = process.env.REACT_APP_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
    const refreshToken = process.env.REACT_APP_REFRESH_TOKEN;
    const gatewayUrl = process.env.REACT_APP_GATEWAY_URL;

    const encodedCredentials = btoa(`${clientId}:${clientSecret}`);
    try {
      const response = await axios.post(
        `${gatewayUrl}/auth/oauth2/token`,
        new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${encodedCredentials}`,
          },
        }
      );

      cachedToken = response.data.access_token;
      tokenExpiry = new Date(new Date().getTime() + 1000 * 60 * 59); // Set expiry for 59 minutes later

      return cachedToken;
    } catch (error) {
      console.error('Error fetching access token:', error);
      return null;
    }
  };
})();

const App = () => {
  const [jsonSchema, setJsonSchema] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [employmentId, setEmploymentId] = useState(null);
  const [isContractDetails, setIsContractDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [initialFormValues, setInitialFormValues] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [error, setError] = useState(null);

  const fetchSchema = useCallback(async (endpoint) => {
    setIsLoading(true);
    setError(null);
    const token = await getAccessToken();

    if (token) {
      setAccessToken(token);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_GATEWAY_URL}${endpoint}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setJsonSchema(response.data.data);
      } catch (error) {
        console.error('Error fetching JSON schema:', error);
        setError(`Error fetching form data: ${error.response?.data?.message || error.message}`);
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (initialFormValues && !isContractDetails) {
      console.log("employment_basic_information");
      fetchSchema(`/v1/countries/${initialFormValues.country_code}/employment_basic_information`);
    }
  }, [fetchSchema, isContractDetails, initialFormValues]);

  useEffect(() => {
    if (employmentId && isContractDetails) {
      console.log("contract_details");
      fetchSchema(`/v1/countries/${initialFormValues.country_code}/contract_details`);
    }
  }, [employmentId, isContractDetails, fetchSchema, initialFormValues]);

  const handleInitialFormSubmit = (values) => {
    setInitialFormValues(values);
  };

  const handleSubmit = async (jsonValues) => {
    try {
      setError(null);

      if (!isContractDetails) {
        const postResponse = await axios.post(
          `${process.env.REACT_APP_GATEWAY_URL}/v1/employments`,
          {
            basic_information: {
              email: jsonValues.email,
              has_seniority_date: jsonValues.has_seniority_date,
              job_title: jsonValues.job_title,
              name: jsonValues.name,
              provisional_start_date: jsonValues.provisional_start_date,
            },
            country_code: initialFormValues.country_code,
            type: initialFormValues.type,
            pricing_plan: initialFormValues.pricing_plan,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
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
          `${process.env.REACT_APP_GATEWAY_URL}/v1/employments/${employmentId}`,
          {
            contract_details: {
              ...jsonValues
            },
            pricing_plan_details: {
              frequency: initialFormValues.pricing_plan,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (patchResponse.status === 200) {
          if (initialFormValues.send_self_enrollment_invitation) {
            try {
              const inviteResponse = await axios.post(
                `${process.env.REACT_APP_GATEWAY_URL}/v1/employments/${employmentId}/invite`,
                {},
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                  },
                }
              );
              setSubmissionStatus('Invite sent successfully!');
              console.log('Self-enrollment invitation sent:', inviteResponse.data);
            } catch (error) {
              setSubmissionStatus('Contract details and pricing plan submitted successfully, but failed to send invite.');
              setError(`Failed to send invite: ${error.response?.data?.message || error.message}`);
              console.error('Failed to send invite:', error);
            }
          } else {
            setSubmissionStatus('Contract details and pricing plan submitted successfully, invite was not sent as requested.');
          }
        }
      }
    } catch (error) {
      setSubmissionStatus('Patch request failed.');
      setError(`An error occurred during the patch request: ${error.response?.data?.message || error.message}`);
      console.error('Error during employment process:', error);
    }
  };

  const handleStartOver = () => {
    setInitialFormValues(null);
    setEmploymentId(null);
    setIsContractDetails(false);
    setSubmissionStatus(null);
    setError(null);
  };

  const initialFormFields = [
    {
      name: 'country_code',
      label: 'Country Code',
      type: 'text',
      defaultValue: '',
    },
    {
      name: 'type',
      label: 'Type of Employee',
      type: 'select',
      options: [
        { value: 'employee', label: 'Employee' },
        { value: 'contractor', label: 'Contractor' },
      ],
      defaultValue: '',
    },
    {
      name: 'pricing_plan',
      label: 'Pricing Plan',
      type: 'select',
      options: [
        { value: 'monthly', label: 'Monthly' },
        { value: 'annually', label: 'Annually' },
      ],
      defaultValue: '',
    },
    {
      name: 'send_self_enrollment_invitation',
      label: 'Send Self-Enrollment Invitation',
      type: 'checkbox',
      defaultValue: false,
    },
  ];

  const validationSchema = Yup.object({
    country_code: Yup.string().required('Country code is required'),
    type: Yup.string().required('Type of employee is required'),
    pricing_plan: Yup.string().required('Pricing plan is required'),
    send_self_enrollment_invitation: Yup.boolean(),
  });

  return (
    <>
      <GlobalStyle />
      <div className="App">
        {!initialFormValues ? (
          <DynamicForm
            fields={initialFormFields}
            validationSchema={validationSchema}
            onSubmit={handleInitialFormSubmit}
          />
        ) : (
          <>
            {isLoading ? (
              <div>Loading...</div>
            ) : submissionStatus ? (
              <FormArea>
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

export default App;
