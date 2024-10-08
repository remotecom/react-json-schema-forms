import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

import { getClientCredentialsToken } from "@/utils/auth-utils.js";

async function fetchCountries() {
  const accessToken = await getClientCredentialsToken();
  const response = await axios.get("/api/v1/cost-calculator/countries", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
}

async function fetchEstimation(payload) {
  const accessToken = await getClientCredentialsToken();
  const response = await axios.post(
    `/api/v1/cost-calculator/estimation`,
    payload,
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
export const useCountries = () => {
  return useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
    select: (data) => data.data,
  });
};

/**
 * Estimates the cost of employment
 * @returns {import("@tanstack/react-query").UseMutationResult}
 */
export const useEstimation = () => {
  return useMutation({
    mutationFn: fetchEstimation,
  });
};
