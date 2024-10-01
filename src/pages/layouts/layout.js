import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import { CredsForm } from "@/components/CredentialsForm.jsx";
import { HomeButton } from "@/App.styled.jsx";

const credentials = {
  clientId: import.meta.env.REACT_APP_CLIENT_ID || "",
  clientSecret: import.meta.env.REACT_APP_CLIENT_SECRET || "",
  refreshToken: import.meta.env.REACT_APP_REFRESH_TOKEN || "",
  gatewayUrl: import.meta.env.REACT_APP_GATEWAY_URL || "",
};

function Layout() {
  const [creds, setCreds] = useState();

  const handleCredsSubmit = (values) => {
    setCreds(values);
  };

  return (
    <div className="App">
      <HomeButton to="/">Home</HomeButton>
      <CredsForm initialValues={creds} onSubmit={handleCredsSubmit} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
