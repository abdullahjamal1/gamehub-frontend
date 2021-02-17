import React, { Component } from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import { getGameInfo, getGame } from "../services/gameService";
import Comments from "./comments";
import { rateGame } from "../services/gameService";
import { voteComment } from "../services/commentService";
import { Card, Button } from "react-bootstrap";
import CardBody from "./cardBody";
import { saveAs } from "file-saver";

class GameView extends Component {
  state = {
    game: {},
  };

  async componentDidMount() {
    const { data: game } = await getGameInfo(this.props.match.params.id);
    this.setState({ game });
  }

  handleRating = async (newRating) => {
    await rateGame(this.state.game.game_id, newRating);
  };

  handleVote = async (commentId, vote) => {
    if (vote === 1) console.log("upvoted");
    else console.log("downvoted");
    await voteComment(commentId, vote);
  };

  render() {
    const { game } = this.state;
    if (game.game_id === undefined) return <div></div>;
    console.log("gameView", game.game_id);
    return (
      <div className="container">
        <Card bg={"light"}
    text={ 'light'=== 'light' ? 'dark' : 'white'}>
          <Card.Header>
            <Card.Title>{game.title}</Card.Title>
          </Card.Header>
          <Card.Body className="Light">
            <div className="row">
              <CardBody game={game} />
            </div>
            <div className="row">{game.description}</div>
          </Card.Body>
          <Card.Footer className="text-muted">
            Last Updated on {game.modified_time}
          </Card.Footer>
        </Card>
        <Comments gameId={this.props.match.params.id} parentId={-1} />
      </div>
    );
  }
}

export default GameView;
