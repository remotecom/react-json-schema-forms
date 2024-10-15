import { create } from "zustand";

export const useCredentials = create((set) => {
  const credentials = JSON.parse(localStorage.getItem("credsFormData"));
  return {
    credentials: {
      clientId: credentials?.clientId || "",
      clientSecret: credentials?.clientSecret || "",
      gatewayUrl: credentials?.gatewayUrl || "https://gateway.niceremote.com",
    },
    refreshToken: credentials?.refreshToken || "",
    partnerAccessToken: "",
    customerAccessToken: "",
    setCredentialsForm: (credentials) => {
      const { refreshToken, ...restCredentials } = credentials;
      return set((state) => ({
        ...state,
        credentials: restCredentials,
        refreshToken,
      }));
    },
    updateCustomerCredentials: ({
      access_token: customerAccessToken,
      refresh_token: refreshToken,
    }) => set((state) => ({ ...state, customerAccessToken, refreshToken })),
  };
});
