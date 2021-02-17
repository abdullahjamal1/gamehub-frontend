import React from "react";

const VoteButton = ({ commentId, upVotes, downVotes, onVote }) => {
  return (
    <React.Fragment>
      <div className="row m-1">
        <div
          className="btn-sm btn-light btn-block "
          onClick={() => onVote(commentId, 1)}
        >
          <div className="row justify-content-center">{upVotes}</div>
          <div className="row justify-content-center ">
            <div className="fa fa-sort-asc fa-2x"></div>
          </div>
        </div>
      </div>
      <div className="row m-1">
        <div
          className="btn-sm btn-light btn-block"
          onClick={() => onVote(commentId, 0)}
        >
          <div className="row justify-content-center ">
            <div className="fa fa-sort-desc fa-2x"></div>
          </div>
          <div className="row justify-content-center">{downVotes}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default VoteButton;
