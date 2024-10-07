import { Outlet } from "react-router-dom";

import { CredentialsForm } from "@/domains/shared/credentials/CredentialsForm";
import { HomeButton } from "@/components/HomeButton";

export function Layout() {
  return (
    <>
      <header className="flex justify-between items-center p-5">
        <HomeButton to="/" />
        <CredentialsForm initialValues={{}} onSubmit={() => {}} />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
