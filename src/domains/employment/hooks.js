import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

import { getAccessToken } from "@/utils/auth-utils.js";

async function fetchEmploymentBasicInformation(countryCode) {
  const accessToken = await getAccessToken();
  const response = await axios.get(
    `/api/v1/countries/${countryCode}/employment_basic_information`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
}

async function fetchEmploymentContractDetails(countryCode) {
  const accessToken = await getAccessToken();
  const response = await axios.get(
    `/api/v1/countries/${countryCode}/contract_details`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
}

async function fetchEmployment({ bodyParams }) {
  const accessToken = await getAccessToken();
  const response = await axios.post("/api/v1/employments", bodyParams, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
}

async function patchEmployment(employmentId, { bodyParams }) {
  const accessToken = await getAccessToken();
  const response = await axios.patch(
    `/api/v1/employments/${employmentId}`,
    bodyParams,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
}

async function fetchEmploymentInvite(employmentId) {
  const accessToken = await getAccessToken();
  const response = await axios.post(
    `/api/v1/employments/${employmentId}/invite`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
}

export const useJsonSchema = (countryCode, employmentId) => {
  const basicInformationSchema = useEmploymentBasicInformation(countryCode);
  const contractDetailsSchema = useEmploymentContractDetails(
    countryCode,
    employmentId
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
  });
};

/**
 * Creates an employment
 * @returns {import("@tanstack/react-query").UseMutationResult}
 */
export const useCreateEmployment = (options) => {
  console.log("options", options);
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
