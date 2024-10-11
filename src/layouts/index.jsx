import { Outlet, Link, useLocation } from "react-router-dom";

import { CredentialsForm } from "@/domains/shared/credentials/CredentialsForm";
import { HomeButton } from "@/components/HomeButton";
import { cn } from "@/lib/utils";

export function Layout() {
  const location = useLocation();

  console.log(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="flex h-16 items-center justify-between px-4 border-b border-borders bg-tertiary">
        <nav className="flex items-center space-x-4">
          <HomeButton to="/" />
          <Link
            to="/create-company"
            className={cn(
              "text-sm font-medium hover:text-primary",
              location.pathname === "/create-company" ? "text-primary" : ""
            )}
          >
            Create company
          </Link>
          <Link
            to="/create-employment"
            className={cn(
              "text-sm font-medium hover:text-primary",
              location.pathname === "/create-employment" ? "text-primary" : ""
            )}
          >
            Create employment
          </Link>
          <Link
            to="/cost-calculator"
            className={cn(
              "text-sm font-medium hover:text-primary",
              location.pathname === "/cost-calculator" ? "text-primary" : ""
            )}
          >
            Cost Calculator
          </Link>
          <Link
            to="/playground"
            className={cn(
              "text-sm font-medium hover:text-primary",
              location.pathname === "/playground" ? "text-primary" : ""
            )}
          >
            Playground
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
