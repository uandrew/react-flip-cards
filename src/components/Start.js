import React, { Component } from "react";
import PropTypes from "prop-types";

import Header from "./Header";
import Game from "./Game";

class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStarted: false,
      tiles: []
    };
    this.startResetGame = this.startResetGame.bind(this); // Click events
  }
  // we need 4x4 field
  startResetGame() {
    const tiles = this.props.tiles
      .slice(0)
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
    this.setState({
      gameStarted: true,
      tiles
    });
  }

  render() {
    const game = this.state.gameStarted ? (
      <Game tiles={this.state.tiles} />
    ) : (
      <div className="message">
        <h2>Click start to begin game.</h2>
        <button className="btn" onClick={this.startResetGame}>
          Start
        </button>
      </div>
    );

    const button = (
      <button className="btn" onClick={this.startResetGame}>
        {this.state.gameStarted ? "Reset" : "Start"}
      </button>
    );

    return (
      <div>
        <Header button={button} />
        <div className="wrapper">{game}</div>
      </div>
    );
  }
}

export default Start;
