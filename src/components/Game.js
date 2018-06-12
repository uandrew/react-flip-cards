import React, { Component } from "react";
import PropTypes from "prop-types";

import Tile from "./Tile";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = this.setInitialState(props.characters);
    this.clickedTile = this.clickedTile.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.setInitialState(nextProps.characters));
  }
  setInitialState(tiles) {
    return {
      tiles: this.setTiles(tiles),
      selected: null,
      gameEnded: false,
      paused: false,
      matches: 0,
      attempts: 0
    };
  }
  /* TODO: render some tiles in the beginning */

  // compare two tiles
  isMatch(firstTile, secondTile) {
    const tiles = this.state.tiles;
    const tileOne = tiles[firstTile].tile.replace(/ /g, "-").toLowerCase();
    const tileTwo = tiles[secondTile].tile.replace(/ /g, "-").toLowerCase();
    return tileOne === tileTwo;
  }

  clickedTile() {
    if (this.state.paused) {
    }
    // Work with click
  }

  render() {
    const complete = this.state.gameEnded ? (
      <div className="message">
        <h2>{`Great! You've fond a solution in ${
          this.state.attempts
        } moves.`}</h2>
      </div>
    ) : null;

    // Set characters
    const tiles = this.state.tiles.map((tile, index) => (
      <Tile
        key={index}
        tile={tile.tile}
        matched={tile.matched}
        selected={tile.selected}
        index={index}
        clickedTile={this.clickedTile}
      />
    ));
    return (
      <div className="tiles-wrapper clear">
        {complete}
        <div id="tiles">{tiles}</div>
      </div>
    );
  }
}

/**
 * Proptypes
 */
Game.propTypes = {
  characters: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

export default Game;
