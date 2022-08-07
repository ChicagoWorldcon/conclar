import PropTypes from "prop-types";
import configData from "../config.json";

const showBreak = configData.HEADER.LINEFEED_AFTER_URL ? <br /> : "";

const Header = ({ title }) => {
  document.title = title;
  return (
    <header>
      <img src={configData.HEADER.IMG_SRC} alt={configData.HEADER.IMG_ALT_TEXT}></img>
      {showBreak}
      <h1>{title}</h1>
    </header>
  );
};

Header.defaultProps = {
  title: "Programme Guide",
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
