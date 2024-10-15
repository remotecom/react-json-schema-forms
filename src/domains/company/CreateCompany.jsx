import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Form from "@/components/ui/form/Form.jsx";
import DynamicForm from "@/components/ui/form/DynamicForm.jsx";
import { Result } from "@/components/Result.jsx";
import { Loading } from "@/components/Loading.jsx";
import { Button } from "@/components/ui/Button.jsx";
import { fields, validationSchema } from "./fields.js";
import { useCompany, useCompanyJsonSchema } from "./hooks.js";
import { useCredentials } from "@/domains/shared/credentials/useCredentials.js";

export function CompanyCreation() {
  const [initialFormValues, setInitialFormValues] = useState();
  const [localCustomerCredentials, setLocalCustomerCredentials] = useState();
  const navigate = useNavigate();
  const { updateCustomerCredentials } = useCredentials();
  const { data: jsonSchema, isLoading } = useCompanyJsonSchema(
    initialFormValues?.country_code
  );

  const {
    data: responseData,
    mutate: createCompanyMutation,
    error,
    isError,
    isPending,
  } = useCompany({
    onSuccess: ({ data }) => {
      if (initialFormValues.get_oauth_access_tokens) {
        setLocalCustomerCredentials(data.tokens);
      }
    },
  });

  async function handleInitialFormSubmit(values) {
    setInitialFormValues(values);
  }

  async function handleCompanyInformationSubmit(jsonValues) {
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

    createCompanyMutation({ queryParams: actionParam, bodyParams: payload });
  }

  if (isLoading || isPending) {
    return <Loading />;
  }

  if (isError) {
    return <p className="error">Error creating a company: {error.message}</p>;
  }

  return (
    <>
      {!initialFormValues ? (
        <DynamicForm
          fields={fields}
          validationSchema={validationSchema}
          onSubmit={handleInitialFormSubmit}
        />
      ) : (
        <>
          {responseData ? (
            <div className="result-area">
              <Button
                className=""
                onClick={() => {
                  if (localCustomerCredentials) {
                    updateCustomerCredentials(localCustomerCredentials);
                  }
                  navigate("/create-employment");
                }}
              >
                Create new employment
              </Button>
              {localCustomerCredentials && (
                <p className="text-xs my-4">
                  New employment will be created on behalf of{" "}
                  <span className="font-bold">{initialFormValues.name}</span>
                </p>
              )}
              <Result data={responseData} />
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
