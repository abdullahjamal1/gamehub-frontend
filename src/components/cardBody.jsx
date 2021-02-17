import React from "react";
import { Card, Button, ListGroup, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import GameCarousel from "./common/gameCarousel";

const CardBody = ({ game }) => {
  return (
    <>
      <div className="row">
        <div className="col m-2">
          <GameCarousel gameId={game.game_id} />
        </div>

        <div className="col ml-2">
          <button className="btn btn-success col-10 mb-2">
            <a
              href={
                process.env.REACT_APP_API_URL + `/games/${game.game_id}/file`
              }
            >
              Download <i class="fa fa-download" aria-hidden="true"></i>
            </a>
          </button>
          <Card  border="primary" bg="light"
    >
            <Card.Header>
              {" "}
              Downloaded <i
                class="fa fa-line-chart m-2"
                aria-hidden="true"
              ></i>{" "}
              12 times,
            </Card.Header>
            <Card.Header>
              Rated{" "}
              <strong>
                <i class="fa fa-star ml-2" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star mr-2" aria-hidden="true"></i>
                {game.rating}/5
                <small> by </small> {game.ratedBy}
              </strong>
            </Card.Header>
            <Card.Header>
              <strong>Author: </strong>{" "}
              <Link to={`/user/${game.user_id}`}>{game.user_name}</Link>,{" "}
              <strong> Genre : </strong>
              <Badge variant="danger">{game.type}</Badge>
            </Card.Header>
            <Card.Header>Size : 120 MB</Card.Header>
            <Card.Header>System Requirements :</Card.Header>
            {/* <ListGroup variant="flush">
              <ListGroup.Item></ListGroup.Item>
              <ListGroup.Item></ListGroup.Item>
              <ListGroup.Item>Downloads: 12</ListGroup.Item>
            </ListGroup> */}
          </Card>
        </div>
      </div>
    </>
  );
};

export default CardBody;
