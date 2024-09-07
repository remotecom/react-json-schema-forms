import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmploymentCreationApp from './Employment_Creation/EmploymentCreationApp';
import CompanyCreationApp from './Company_Creation/CompanyCreationApp';
import CostCalculatorApp from './Cost_Calculator/CostCalculatorApp';
import { StyledLinkButton, RouteContainer, GlobalStyle, FormArea, HomeButton, ResultArea } from './App.styled';

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <div className="App">
          <Routes>
            <Route 
              path="/" 
              element={
                <ResultArea>
                  <h1>Experience Remote Embedded</h1>
                  <div style={{ margin: '20px 0', display: 'flex', gap: '10px' }}>
                    <StyledLinkButton to="/create-company">Create a Company</StyledLinkButton>
                    <StyledLinkButton to="/create-employment">Create Employment</StyledLinkButton>
                    <StyledLinkButton to="/cost-calculator">Cost Calculator</StyledLinkButton> 
                  </div>
                  {/* Static Section for Overview */}
                  <section style={{ marginTop: '40px' }}>
                    <h2>About This Tool</h2>
                    <p>
                      This tool is designed to help partners quickly, easily, and efficiently adopt and extend JSON schemas 
                      within their own platforms. Built on top of the <a href="https://github.com/remoteoss/json-schema-form" target="_blank" rel="noopener noreferrer">
                          remoteoss/json-schema-form
                      </a> library, the codebase behind this app provides a solid foundation for rendering, validating, and handling submissions 
                      of JSON schemas.
                    </p>
                    <h3>Key Features</h3>
                    <ul>
                      <li>
                        <strong>JSON Schema Adoption:</strong> This tool simplifies the process of adopting JSON schemas, allowing you to 
                        quickly integrate form rendering and validation based on JSON schemas.
                      </li>
                      <li>
                        <strong>Validation & Rendering:</strong> All validation and rendering of forms are handled seamlessly by the <a href="https://github.com/remoteoss/json-schema-form" target="_blank" rel="noopener noreferrer">
                          remoteoss/json-schema-form
                        </a> library, ensuring a consistent and robust user experience.
                      </li>
                      <li>
                        <strong>Extensibility:</strong> Partners can use this codebase as a starting point to build on top of JSON schemas, 
                        customizing it to fit their specific needs and workflows.
                      </li>
                    </ul>
                    <h3>JSON Schema Resources</h3>
                    <p>
                      To learn more about JSON schemas and how they can be utilized in your applications, check out the <a href="https://json-schema.org/blog/posts/remote-case-study#light-scheme-icon" target="_blank" rel="noopener noreferrer">
                        JSON Schema Case Study by Remote
                      </a>.
                    </p>
                    <h3>App Flows</h3>
                    <p>
                      This tool includes two main example flows:
                    </p>
                    <ul>
                      <li><strong>Company Creation:</strong> Demonstrates how a new company can be created within the Remote system.</li>
                      <li><strong>Employment Creation:</strong> Shows how to set up employment for employees under a created company.</li>
                      <li><strong>Cost Calculator:</strong> Provides an interface for estimating the cost of employment in different countries, including salary, benefits, and more.</li>
                    </ul>
                    <p>
                      These flows represent the employer's journey up to the point where the employee receives a self-enrollment email. 
                      After this point, both the employer and employee can continue their journey on the Remote platform, which handles 
                      the ongoing employment relationship, compliance, and payroll processes.
                    </p>
                    <br></br>

                    <p>
                      This is a sample implementation of how you can structure similar workflows in your own applications, with all the heavy lifting 
                      around form management and validation handled by the `remoteoss/json-schema-form` library.
                    </p>
                    <h3>Partnering with Remote</h3>
                    <p>
                      If you're interested in partnering with Remote, this tool demonstrates the ease with which you can integrate JSON schema 
                      based forms and workflows into your product. By leveraging this codebase, you can offer your clients a powerful and 
                      compliant experience for managing companies and employment relationships globally.
                    </p>
                  </section>
                </ResultArea>
              } 
            />
            <Route path="/create-company" element={<CompanyCreationApp />} />
            <Route path="/create-employment" element={<EmploymentCreationApp />} />
            <Route path="/cost-calculator" element={<CostCalculatorApp />}/>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
