import reactLogo from "@/assets/remote.svg";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export function HomeButton({ to }) {
  return (
    <Link className="inline-block" to={to}>
      <img src={reactLogo} className="logo react" alt="React logo" />
    </Link>
  );
}

HomeButton.propTypes = {
  to: PropTypes.string.isRequired,
};
