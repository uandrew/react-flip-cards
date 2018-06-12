/* eslint-disable */
import React, { Component } from "react";
import PropTypes from "prop-types";

import Tile from "./Tile";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = this.setInitialState(props.tiles);
    this.clickedTile = this.clickedTile.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.setInitialState(nextProps.tiles));
  }
  setTiles(tiles) {
    return tiles.concat(tiles).reduce((array, current) => {
      array.push({
        tile: current,
        selected: false,
        matched: false
      });
      return array;
    }, []);
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
  // compare two tiles
  isMatch(firstTile, secondTile) {
    const tiles = this.state.tiles;
    const tileOne = tiles[firstTile].tile.replace(/ /g, "-").toLowerCase();
    const tileTwo = tiles[secondTile].tile.replace(/ /g, "-").toLowerCase();
    return tileOne === tileTwo;
  }

  clickedTile(index) {
    if (this.state.paused) {
      return;
    }
    const tiles = this.state.tiles;
    tiles[index].selected = true;
    this.setState({
      tiles,
      paused: true
    });
    if (!this.state.selected && this.state.selected !== 0) {
      this.setState({
        selected: index,
        paused: false
      }); // Set state
    } else {
      const attempts = this.state.attempts + 1;
      this.setState({ attempts });
      if (this.isMatch(index, this.state.selected)) {
        const matches = this.state.matches + 1;
        tiles[index].matched = true;
        tiles[this.state.selected].matched = true;
        this.setState({
          tiles,
          selected: null,
          paused: false,
          matches,
          gameEnded: matches === this.state.tiles.length / 2
        });
      } else {
        // delay for tile to disappear
        setTimeout(() => {
          tiles[index].selected = false;
          tiles[this.state.selected].selected = false;
          this.setState({
            tiles,
            selected: null,
            paused: false
          });
        }, 700);
      }
    }
  }

  render() {
    const complete = this.state.gameEnded ? (
      <div className="message">
        <h2>{`Great! You've fond a solution in ${
          this.state.attempts
        } rounds.`}</h2>
      </div>
    ) : null;

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
Game.propTypes = {
  tiles: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};
export default Game;
