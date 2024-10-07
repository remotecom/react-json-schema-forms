import { useCredentials } from "@/domains/shared/credentials/useCredentials.js";
import axios from "axios";

export const getAccessToken = async (setError = null, setIsLoading = null) => {
  const credentials = useCredentials.getState().credentials;
  const { clientId, clientSecret, refreshToken, gatewayUrl } = credentials;

  if (!clientId || !clientSecret || !refreshToken || !gatewayUrl) {
    const errorMessage = "Error fetching form data: Missing credentials.";
    console.error(errorMessage);
    if (setError) setError(errorMessage);
    if (setIsLoading) setIsLoading(false);
    return null;
  }

  const encodedCredentials = btoa(`${clientId}:${clientSecret}`);
  try {
    const response = await axios.post(
      "/api/auth/oauth2/token",
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${encodedCredentials}`,
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    const errorMessage = `Error fetching form data: Error fetching access token: ${error.message}`;
    console.error("Error fetching access token:", error);
    if (setError) setError(errorMessage);
    if (setIsLoading) setIsLoading(false);
    return null;
  }
};

export const getClientCredentialsToken = async (
  setError = null,
  setIsLoading = null
) => {
  const credentials = useCredentials.getState().credentials;
  const { clientId, clientSecret, gatewayUrl } = credentials;

  if (!clientId || !clientSecret || !gatewayUrl) {
    const errorMessage = "Error fetching form data: Missing credentials.";
    console.error(errorMessage);
    if (setError) setError(errorMessage);
    if (setIsLoading) setIsLoading(false);
    return null;
  }

  const encodedCredentials = btoa(`${clientId}:${clientSecret}`);
  try {
    const response = await axios.post(
      "/api/auth/oauth2/token",
      new URLSearchParams({
        grant_type: "client_credentials",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${encodedCredentials}`,
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    const errorMessage = `Error fetching form data: Error fetching access token: ${error.message}`;
    console.error("Error fetching access token:", error);
    if (setError) setError(errorMessage);
    if (setIsLoading) setIsLoading(false);
    return null;
  }
};
