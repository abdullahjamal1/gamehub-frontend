import React, { Component } from "react";
import { getGameImage } from "../services/gameService";

class GameImage extends Component {
  state = { image: ""};
  componentDidMount = async () => {
    const image = await getGameImage(this.props.gameId);
    this.setState({ image });
  };
  render() {
    if (!this.state.image) return <></>;
    return (
      <img
        src={this.state.image}
        className="card-img-top img-fluid"
        alt="..."
      />
    );
  }
}

export default GameImage;
