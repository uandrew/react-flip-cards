import React from "react";
import PropTypes from "prop-types";

const Header = ({ button }) => (
  <header className="header center">
    <div className="wrapper">
      <h1 className="left">Our game</h1>
      <div id="game-control-buttons" className="right">
        {button}
      </div>
    </div>
  </header>
);
Header.propTypes = {
  button: PropTypes.element.isRequired
};
export default Header;
