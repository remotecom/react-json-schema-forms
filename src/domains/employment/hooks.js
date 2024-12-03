import { useMutation, useQuery } from "@tanstack/react-query";

import { customerApiClient } from "@/lib/api";

async function fetchEmploymentBasicInformation(countryCode) {
  const response = await customerApiClient.get(
    `/api/v1/countries/${countryCode}/employment_basic_information`
  );
  return response.data;
}

async function fetchEmploymentContractDetails(countryCode) {
  const response = await customerApiClient.get(
    `/api/v1/countries/${countryCode}/contract_details`
  );
  return response.data;
}

async function fetchEmployment({ bodyParams }) {
  const response = await customerApiClient.post(
    "/api/v1/employments",
    bodyParams
  );
  return response.data;
}

async function patchEmployment(employmentId, { bodyParams }) {
  const response = await customerApiClient.patch(
    `/api/v1/employments/${employmentId}`,
    bodyParams
  );
  return response.data;
}

async function fetchEmploymentInvite(employmentId) {
  const response = await customerApiClient.post(
    `/api/v1/employments/${employmentId}/invite`
  );
  return response.data;
}

export const useJsonSchema = (countryCode, employmentId,formKey) => {
  const basicInformationSchema = useEmploymentBasicInformation(countryCode);
  const contractDetailsSchema = useEmploymentContractDetails(
    countryCode,
    employmentId,
    formKey
  );

  return employmentId ? contractDetailsSchema : basicInformationSchema;
};
/**
 * Fetches the basic information for a country
 * @returns {import("@tanstack/react-query").UseQueryResult}
 */
const useEmploymentBasicInformation = (countryCode) => {
  return useQuery({
    queryKey: ["employment-basic-information", countryCode],
    queryFn: () => fetchEmploymentBasicInformation(countryCode),
    select: (data) => data.data,
    enabled: !!countryCode,
  });
};

/**
 * Fetches the contract details for a country
 * @returns {import("@tanstack/react-query").UseQueryResult}
 */
const useEmploymentContractDetails = (countryCode, employmentId) => {
  return useQuery({
    queryKey: ["employment-contract-details", countryCode],
    queryFn: () => fetchEmploymentContractDetails(countryCode),
    select: (data) => data.data,
    enabled: !!countryCode && !!employmentId,
    cacheTime: 0, // Optional: Disable caching
    staleTime: 0,
  });
};

/**
 * Creates an employment
 * @returns {import("@tanstack/react-query").UseMutationResult}
 */
export const useCreateEmployment = (options) => {
  return useMutation({
    mutationFn: fetchEmployment,
    ...options,
  });
};

/**
 * Updates an employment
 * @returns {import("@tanstack/react-query").UseMutationResult}
 */
export const useUpdateEmployment = (id, options) => {
  return useMutation({
    mutationFn: (params) => patchEmployment(id, params),
    ...options,
  });
};

/**
 * Sends an employment invite
 * @returns {import("@tanstack/react-query").UseMutationResult}
 */
export const useEmploymentInvite = (id, options) => {
  return useMutation({
    mutationFn: () => fetchEmploymentInvite(id),
    ...options,
  });
};
