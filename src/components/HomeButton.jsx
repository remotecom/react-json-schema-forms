import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import theme from "@/theme.json";

export function HomeButton({ to }) {
  return (
    <Link to={to}>
      <img src={theme.logo.src} alt={theme.logo.alt} />
    </Link>
  );
}

HomeButton.propTypes = {
  to: PropTypes.string.isRequired,
};
