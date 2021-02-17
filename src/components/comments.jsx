import React, { Component } from "react";
import CommentForm from "./commentForm";
import VoteButton from "./voteButton";
import { Link } from "react-router-dom";
import {
  getComments,
  postComment,
  voteComment,
} from "../services/commentService";
import LoginContext from "../contexts/loginContext";

class Comments extends Component {
  state = {
    comments: [],
  };

  async componentDidMount() {
    const { gameId, parentId } = this.props;
    const { data: comments } = await getComments(gameId, parentId);

    this.setState({ comments });
  }

  handleVote = async (commentId, vote) => {
    if (this.context.user === undefined) {
      this.context.onHandleShow();
      return;
    }
    await voteComment(commentId, vote);
    const { gameId, parentId } = this.props;
    const { data: comments } = await getComments(gameId, parentId);

    this.setState({ comments });
  };

  handleComment = async (data, gameId, parentId) => {
    const { data: comment } = await postComment(data, gameId, parentId);
    const comments = [...this.state.comments, comment];
    this.setState({ comments });
  };

  render() {
    const { comments } = this.state;
    const { gameId, parentId } = this.props;
    if (!comments) return <></>;
    return (
      <div>
        {parentId === -1 && <h2>Comments ({this.state.comments.length})</h2>}
        <CommentForm
          gameId={gameId}
          parentId={parentId}
          onComment={this.handleComment}
        />
        {comments.map((c) => (
          <div className="media bg-light row m-2" key={c.msg_id}>
            <div className="col-2">
              <div className="row justify-content-center">
                <img
                  className="img-fluid"
                  src={
                    process.env.REACT_APP_API_URL + `/users/${c.user_id}/avatar`
                  }
                  alt="avatar"
                  style={{ height: 100, width: 100 }}
                />
              </div>
              <Link to={"/user/" + c.user_id}>
                <div className="row justify-content-center">{c.user_name}</div>
              </Link>
            </div>
            <div className="media-body col-sm-10 col-8">
              <div className="row">
                <div className="col-1">
                  <VoteButton
                    commentId={c.msg_id}
                    upVotes={c.up_votes}
                    downVotes={c.down_votes}
                    onVote={this.handleVote}
                  />
                </div>
                <div className="col">
                  <p className="card-text col-12 m-2">
                    <p>{c.description}</p>
                    <small className="text-muted col-12">
                      commented on {c.creation_time}
                    </small>
                    <Reply
                      parentId={c.msg_id}
                      gameId={gameId}
                      onComment={this.handleComment}
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

Comments.contextType = LoginContext;

const Reply = ({ parentId, gameId, onComment }) => {
  return (
    <>
      <Comments gameId={gameId} parentId={parentId} />
    </>
  );
};

export default Comments;
