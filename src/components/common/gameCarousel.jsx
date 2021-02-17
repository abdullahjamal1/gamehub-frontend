import React, { Component } from "react";
import { getGameImageCount } from "../../services/gameService";
import { Carousel } from "react-bootstrap";

class GameCarousel extends Component {
  state = { images: [] };

  componentDidMount = async () => {
    console.log("props", this.props);
    const { data: size } = await getGameImageCount(this.props.gameId);
    const images = [];
    for (let i = 1; i <= size; i++) {
      images.push(i);
    }
    this.setState({ images });
  };
  render() {
    const { images } = this.state;
    const { gameId } = this.props;
    if (images.length === 0) return <img src="#" />;
    return (
      <Carousel className="game-carousel">
        {images.map((image) => (
          <Carousel.Item>
            <div>
              <img
                src={
                  process.env.REACT_APP_API_URL +
                  `/games/${gameId}/images/${image}`
                }
                styles={{
                  height: "50 rem",
                  width: "50 rem",
                  objectFit: "cover",
                }}
                className="w-100 game-carousel"
                alt="slide ${image}"
              />
            </div>

            {/* <Carousel.Caption>
          <h3>{game.title}</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
          </Carousel.Item>
        ))}
      </Carousel>
    );
  }
}

export default GameCarousel;
