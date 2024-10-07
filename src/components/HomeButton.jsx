import revolutLogo from "@/assets/partners/revolut.svg";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export function HomeButton({ to }) {
  return (
    <Link className="inline-block" to={to}>
      <img src={revolutLogo} alt="home" />
    </Link>
  );
}

HomeButton.propTypes = {
  to: PropTypes.string.isRequired,
};
