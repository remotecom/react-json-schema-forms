import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';

export const GlobalStyle = createGlobalStyle`
  :root {
    --colors-linkWater: #F4F7FC;
    --colors-darkNavy: #00183e;
    --colors-darkBlue: #00234B;
    --colors-blank: #ffffff;
    --colors-bayoux: #525F7F;
    --colors-redPink: #FF4A5A;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: Sans-Serif;
    box-sizing: border-box;
    color: var(--colors-darkBlue);
    background: var(--colors-linkWater);
    
    * {
      box-sizing: inherit;
    }
  }

  a {
    color: var(--colors-darkNavy);
  }

  h1,
  p {
    margin: 0;
  }

  h1 {
    font-size: 1.5rem;
  }

  fieldset {
    border: none;
    padding: 0;
  }

  legend {
    margin: 0;
  }
`;

export const FormArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 460px;
  gap: 24px;
  padding: 32px 16px;
  margin: 24px auto;
  --fieldWidth: 200px;
  background-color: var(--colors-blank);
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 5%) 6px 6px 54px;

  label:has(input[type="checkbox"]) {
    display: block;
  }

  input:not([type="checkbox"]):not([type="radio"]) {
    height: 30px;
    width: var(--fieldWidth);
    border: 1px solid var(--colors-bayoux);
    border-radius: 6px;
    font-size: inherit;
    padding: 4px;
  }

  textarea {
    width: var(--fieldWidth);
    border: 1px solid var(--colors-bayoux);
    border-radius: 6px;
    font-family: inherit;
    font-size: inherit;
    padding: 4px;
  }

  select {
    height: 30px;
    width: var(--fieldWidth);
    border: 1px solid var(--colors-bayoux);
    border-radius: 6px;
    font-family: inherit;
    font-size: inherit;
    padding: 4px;
  }

  button[type="submit"] {
    background-color: var(--colors-darkNavy);
    color: var(--colors-blank);
    min-height: 40px;
    min-width: 120px;
    border-radius: 50px;
    border-width: 2px;
    border: none;
    padding: 0px 22px;
    cursor: pointer;

    &:hover {
      filter: saturate(1.4);
    }

    &:focus:not(:focus-visible) {
      outline: none;
    }
    &:focus-visible {
      outline: none;
      box-shadow: rgb(255 255 255) 0px 0px 0px 3px,
        rgb(98 77 227) 0px 0px 0px 5px;
    }
  }

    button {
    background-color: var(--colors-darkNavy);
    color: var(--colors-blank);
    min-height: 40px;
    min-width: 120px;
    border-radius: 50px;
    border-width: 2px;
    border: none;
    padding: 0px 22px;
    cursor: pointer;

    &:hover {
      filter: saturate(1.4);
    }

    &:focus:not(:focus-visible) {
      outline: none;
    }
    &:focus-visible {
      outline: none;
      box-shadow: rgb(255 255 255) 0px 0px 0px 3px,
        rgb(98 77 227) 0px 0px 0px 5px;
    }
  }

    Button {
    background-color: var(--colors-darkNavy);
    color: var(--colors-blank);
    min-height: 40px;
    min-width: 120px;
    border-radius: 50px;
    border-width: 2px;
    border: none;
    padding: 0px 22px;
    cursor: pointer;

    &:hover {
      filter: saturate(1.4);
    }

    &:focus:not(:focus-visible) {
      outline: none;
    }
    &:focus-visible {
      outline: none;
      box-shadow: rgb(255 255 255) 0px 0px 0px 3px,
        rgb(98 77 227) 0px 0px 0px 5px;
    }
  }
`;



export const Label = styled.label`
  display: block;
  margin-bottom: 4px;
`;

export const LabelRadio = styled.label`
  margin-right: 16px;
  margin-bottom: 6px;
  font-size: 0.9em;
  display: flex;
  align-items: flex-start;

  input {
    margin-right: 4px;
  }
`;

export const Hint = styled.p`
  font-size: 0.85rem;
  color: var(--colors-bayoux);
  margin: 4px 0;
`;

export const Error = styled.p`
  color: var(--colors-redPink);
  font-size: 0.85rem;
  margin-top: 4px;
`;

export const FieldsetStyled = styled.fieldset`
  border: 1px solid gray;
  padding: 16px;
  border-radius: 6px;
`;

export const FieldsetRaw = styled.fieldset`
  border: none;
  padding: none;
`;

export const FieldsetRadioStyled = styled.fieldset`
  & + & {
    margin-top: 16px;
  }
`;

export const CreditsStyled = styled.div`
  text-align: center;
  font-size: 0.8rem;
  padding: 16px;
`;

export const CheckboxField = styled.div`
  display: flex;
  align-items: flex-start;

  input[type="checkbox"] {
    margin: 2px 8px 0 0;
  }
`;

export const RadioDescription = styled(Hint)`
  margin: 0 0 12px 22px;
`;

export const Disclaimer = styled.p`
  color: #d92020;
  font-size: 1rem;
  margin-top: 10px;
`;
export const CredsFormWrapper = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 300px;
  background-color: var(--colors-blank);
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 10%) 4px 4px 20px;
  padding: 16px;
  z-index: 1000;
`;

export const ToggleButton = styled.button`
   background-color: var(--colors-darkNavy);
    color: var(--colors-blank);
    min-height: 40px;
    min-width: 120px;
    border-radius: 50px;
    border-width: 2px;
    border: none;
    padding: 0px 22px;
    cursor: pointer;

    &:hover {
      filter: saturate(1.4);
    } 

  &::after {
    content: '${props => (props.isCollapsed ? '→' : '↓')}';
    margin-left: 8px;
    transition: transform 0.3s ease;
  }
`;

export const StyledLinkButton = styled(Link)`
  display: inline-block;
  background-color: var(--colors-darkNavy);
  color: var(--colors-blank);
  min-height: 40px;
  min-width: 120px;
  border-radius: 50px;
  border: none;
  padding: 10px 22px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    filter: saturate(1.4);
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }

  &:focus-visible {
    outline: none;
    box-shadow: rgb(255 255 255) 0px 0px 0px 3px,
      rgb(98 77 227) 0px 0px 0px 5px;
  }
`;
export const RouteContainer = styled.div`
  background-color: var(--colors-linkWater);
  padding: 20px;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 10%) 4px 4px 20px;
  margin-top: 20px;
`;
export const HomeButton = styled(Link)`
  display: inline-block;
  background-color: var(--colors-darkNavy);
  color: var(--colors-blank);
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  margin-bottom: 20px;

  &:hover {
    background-color: var(--colors-darkBlue);
  }
`;