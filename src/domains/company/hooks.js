import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

import { getClientCredentialsToken } from "@/utils/auth-utils.js";

async function fetchJsonSchema(countryCode) {
  const accessToken = await getClientCredentialsToken();
  const response = await axios.get(
    `/api/v1/companies/schema?country_code=${countryCode}&form=address_details`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
}

async function fetchCompany({ queryParams, bodyParams }) {
  const accessToken = await getClientCredentialsToken();
  const response = await axios.post(
    `/api/v1/companies${queryParams}`,
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

/**
 * Fetches the supported countries list
 * @returns {import("@tanstack/react-query").UseQueryResult}
 */
export const useJsonSchema = (countryCode) => {
  return useQuery({
    queryKey: ["json-schema", countryCode],
    queryFn: () => fetchJsonSchema(countryCode),
    select: (data) => data.data,
    enabled: !!countryCode,
  });
};

/**
 * Estimates the cost of employment
 * @returns {import("@tanstack/react-query").UseMutationResult}
 */
export const useCompany = () => {
  return useMutation({
    mutationFn: fetchCompany,
  });
};
