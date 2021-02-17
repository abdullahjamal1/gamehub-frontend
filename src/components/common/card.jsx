import React from "react";
import ReactStars from "react-rating-stars-component";
import "../../App.css";
import { Link } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';

const Card = ({ games }) => {
  return (
    <div className="row">
      {games.map((game) => (
        <div key={game.game_id} className="col-12 col-sm-4 ">
          <div className="card m-2 shadow">
            <div className="card-header justify-content-md-center">
                <span>{game.title}</span>
                <Badge variant="danger" className="ml-2">
                  {game.type}
                </Badge>
            </div>
            <img
              src={
                process.env.REACT_APP_API_URL +
                `/games/${game.game_id}/images/1`
              }
              className="card-img-top img-fluid"
              alt="..."
            />
            <div className="card-body">
              {/* <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p> */}
              <div className="row">
                <div className="col">
                  <Link
                    to={`/games/${game.game_id}`}
                    className="btn btn-primary"
                  >
                    View
                  </Link>
                </div>
                <div className="col-ml-3">
                  <ReactStars
                    count={5}
                    size={20}
                    value={game.rating}
                    edit={false}
                    isHalf={true}
                  />
                </div>
                <p className="col">{game.rating}/5</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
