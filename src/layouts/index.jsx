import { Outlet, Link } from "react-router-dom";

import { CredentialsForm } from "@/domains/shared/credentials/CredentialsForm";
import { HomeButton } from "@/components/HomeButton";

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="flex h-16 items-center justify-between px-4 border-b border-borders bg-tertiary">
        <nav className="flex items-center space-x-4">
          <HomeButton to="/" />
          <Link to="/create-company" className="text-sm font-medium">
            Create company
          </Link>
          <Link to="/create-employment" className="text-sm font-medium">
            Create employment
          </Link>
          <Link to="/cost-calculator" className="text-sm font-medium">
            Cost Calculator
          </Link>
        </nav>
        <CredentialsForm initialValues={{}} onSubmit={() => {}} />
      </header>
      <main className="m-8">
        <Outlet />
      </main>
    </div>
  );
}
