import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import EmploymentCreationApp from './Employment_Creation/App';
import CompanyCreationApp from './Company_Creation/App';
import { StyledLinkButton, RouteContainer, GlobalStyle, FormArea, HomeButton } from './App.styled';

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
                <FormArea>
                  <h1>Welcome to the Employment and Company Management System</h1>
                  <div style={{ margin: '20px 0', display: 'flex', gap: '10px' }}>
                    <StyledLinkButton to="/create-company">Create a Company</StyledLinkButton>
                    <StyledLinkButton to="/create-employment">Create Employment</StyledLinkButton>
                  </div>
                </FormArea>
              } 
            />
            <Route path="/create-company" element={<CompanyCreationApp />} />
            <Route path="/create-employment" element={<EmploymentCreationApp />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
