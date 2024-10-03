import reactLogo from "@/assets/remote.svg";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledHomeButton = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  margin-bottom: 20px;
`;

export function HomeButton({ to }) {
  return (
    <StyledHomeButton to={to}>
      <img src={reactLogo} className="logo react" alt="React logo" />
    </StyledHomeButton>
  );
}

HomeButton.propTypes = {
  to: PropTypes.string.isRequired,
};
