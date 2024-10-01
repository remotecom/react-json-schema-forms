import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { EmploymentCreationPage } from "@/pages/create-employment/index.jsx";
import { CompanyCreationPage } from "@/pages/create-company/index.jsx";
import { CostCalculatorPage } from "@/pages/cost-calculator/index.jsx";
import { HomePage } from "@/pages/index.jsx";
import { GlobalStyle } from "@/App.styled.jsx";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create-company" element={<CompanyCreationPage />} />
            <Route
              path="/create-employment"
              element={<EmploymentCreationPage />}
            />
            <Route path="/cost-calculator" element={<CostCalculatorPage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
