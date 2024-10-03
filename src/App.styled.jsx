import styled, { createGlobalStyle } from "styled-components";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const GlobalStyle = createGlobalStyle`
  :root {
    --colors-linkWater: #F4F7FC;
    --colors-darkNavy: #0061FF;
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
  max-width: 380px;
  gap: 24px;
  padding: 32px 16px;
  margin: 24px auto;
  --fieldWidth: 200px;
  background-color: var(--colors-blank);
  border-radius: 10px;

  label:has(input[type="checkbox"]) {
    display: block;
  }

  textarea {
    border: 1px solid var(--colors-bayoux);
    border-radius: 6px;
    font-family: inherit;
    font-size: inherit;
    padding: 4px;
  }
`;

export const Label = (props) => {
  const { children, ...rest } = props;
  return (
    <label className="block mb-1" {...rest}>
      {children}
    </label>
  );
};

Label.propTypes = {
  children: PropTypes.node.isRequired,
};

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
`;

export const FieldsetStyled = styled.fieldset`
  border: 1px solid gray;
  padding: 16px;
  border-radius: 6px;
`;

export const FieldsetRadioStyled = styled.fieldset`
  & + & {
    margin-top: 16px;
  }
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
    content: "${(props) => (props.isCollapsed ? "→" : "↓")}";
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
    box-shadow: rgb(255 255 255) 0px 0px 0px 3px, rgb(98 77 227) 0px 0px 0px 5px;
  }
`;

export const ResultContainer = styled.div`
  padding: 20px;
  background-color: var(--colors-blank);
  border-radius: 8px;
  margin: 20px 0;
  max-width: 100%; /* Ensure the container can expand */
  overflow-x: auto; /* Handle any overflow gracefully */
`;

export const Section = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px; /* Reduced to create a tighter layout */
  align-items: flex-start;
  padding-left: ${({ level }) => (level > 1 ? `${(level - 1) * 20}px` : "0px")};
`;

export const Key = styled.div`
  font-weight: bold;
  color: var(--colors-darkBlue);
  font-size: clamp(0.8rem, 1vw, 1rem); /* Dynamically adjusts font size */
  flex-shrink: 0;
  overflow-wrap: break-word; /* Prevents long keys from overflowing */
`;

export const Value = styled.div`
  color: var(--colors-bayoux);
  font-size: clamp(0.8rem, 1vw, 1rem); /* Dynamically adjusts font size */
  flex-grow: 1;
  text-align: left;
  overflow-wrap: break-word; /* Prevents long values from overflowing */
  margin-left: 10px; /* Space between key and value */
`;

export const ArrayItem = styled.div`
  padding-left: ${({ level }) => (level > 1 ? `${(level - 1) * 20}px` : "0px")};
  padding-top: 5px;
  padding-bottom: 5px;
  border-bottom: 1px solid var(--colors-linkWater);
`;
