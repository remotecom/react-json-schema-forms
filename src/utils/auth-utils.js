import { useCredentials } from "@/domains/shared/credentials/useCredentials.js";
import axios from "axios";

export const getAccessToken = async () => {
  const credentials = useCredentials.getState().credentials;
  const { clientId, clientSecret, refreshToken, gatewayUrl } = credentials;

  if (!clientId || !clientSecret || !refreshToken || !gatewayUrl) {
    console.error("Error fetching access token: Missing credentials.");
    return null;
  }

  const accessToken = useCredentials.getState().customerAccessToken;
  //if (accessToken) {
   // return accessToken; // Use cached access token
  //}

  const encodedCredentials = btoa(`${clientId}:${clientSecret}`);
  try {
    const response = await axios.post(
      "/api/auth/oauth2/token",
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken, // Always use the updated refresh token
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${encodedCredentials}`,
        },
      }
    );

    // Cache the access token
    useCredentials.setState({ customerAccessToken: response.data.access_token });
    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching access token:", error);
    return null;
  }
};

export const getClientCredentialsToken = async () => {
  const credentials = useCredentials.getState().credentials;

  const { clientId, clientSecret, gatewayUrl } = credentials;

  if (!clientId || !clientSecret || !gatewayUrl) {
    const errorMessage = "Error fetching form data: Missing credentials.";
    console.error(errorMessage);
    return null;
  }

  const accessToken = useCredentials.getState().partnerAccessToken;
  if(accessToken) {
    return accessToken
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
    useCredentials.setState({ partnerAccessToken: response.data.access_token});
    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching access token:", error);
    return null;
  }
};
export const useFetchCustomAccessToken = () => {
  return useMutation(async (customRefreshToken) => {
    return await getAccessToken(customRefreshToken);
  });
};