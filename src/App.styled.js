import styled, { createGlobalStyle } from 'styled-components';

// Now you can use createGlobalStyle properly
export const GlobalStyle = createGlobalStyle`
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

export const FieldsetRaw = styled.fieldset`
  border: none;
  padding: none;
`;

export const FormArea = styled.div`
  margin: 0 auto;
  padding: 20px;
  max-width: 600px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
`;

export const Error = styled.div`
  color: red;
  margin-top: 5px;
`;



export const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export const CreditsStyled = styled.div`
  text-align: center;
  margin-top: 20px;
  p {
    margin: 0;
  }
`;

export const Disclaimer = styled.p`
  font-size: 12px;
  color: #777;
  margin-top: 20px;
  text-align: center;
`;

// New exports
export const Hint = styled.span`
  font-size: 12px;
  color: #555;
  margin-top: 10px;
  display: block;
`;

export const CheckboxField = styled.div`
  display: flex;
  align-items: center;
`;

export const FieldsetRadioStyled = styled.fieldset`
  margin-bottom: 20px;
  border: none;
  padding: 0;
`;

export const LabelRadio = styled.label`
  margin-right: 15px;
  display: flex;
  align-items: center;
`;

export const RadioDescription = styled.span`
  font-size: 12px;
  color: #777;
  margin-left: 10px;
`;

export const FieldsetStyled = styled.fieldset`
  margin-bottom: 20px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
`;
