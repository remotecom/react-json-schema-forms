import { useMutation, useQuery } from "@tanstack/react-query";

import { partnerApiClient } from "@/lib/api";

async function fetchJsonSchema(countryCode) {
  const response = await partnerApiClient.get(
    `/api/v1/companies/schema?country_code=${countryCode}&form=address_details`
  );
  return response.data;
}

async function fetchCompany({ queryParams, bodyParams }) {
  const response = await partnerApiClient.post(
    `/api/v1/companies${queryParams}`,
    bodyParams
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
