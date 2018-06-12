// Import dependencies
import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import CHARACTERS_IMAGES from "../characters-images";

class Tile extends Component {
  constructor(props) {
    super(props);
    this.characterClick = this.characterClick.bind(this);
  }

  characterClick() {
    if (!this.props.selected) {
      this.props.clickedTile(this.props.index);
    }
  }

  render() {
    const selected = classNames({
      matched: this.props.matched,
      selected: this.props.selected
    });
    return (
      <div
        className={`flip effect__hover ${selected}`}
        onClick={this.characterClick}
        role="button"
        tabIndex={-1}
      >
        <div className="flip__back">
          <div className={`character ${selected}`}>
            <img
              className="image"
              src={
                CHARACTERS_IMAGES[
                  this.props.tile.replace(/ /g, "-").toLowerCase()
                ]
              }
              alt=""
            />
            <p className="character-name">{this.props.tile}</p>
          </div>
        </div>
        <div className="flip__front">
          <div className="character" />
        </div>
      </div>
    );
  }
}
Tile.propTypes = {
  tile: PropTypes.string.isRequired,
  matched: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  clickedTile: PropTypes.func.isRequired
};
export default Tile;
