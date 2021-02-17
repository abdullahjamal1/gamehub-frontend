import React, { Component } from "react";
import Form from "./common/form";
import { saveGame, postGameFiles } from "../services/gameService";
import Joi from "joi-browser";
import { getGenres } from "../services/genreService";

/**
 * Component to handle file upload. Works for image
 * uploads, but can be edited to work for any file.
 */

class GameForm extends Form {
  state = {
    files: [],
    game: "",
    data: {
      title: "",
      genre_id: "",
      description: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    title: Joi.string().required().label("title"),
    genre_id: Joi.string().required().label("genre"),
    description: Joi.string().required().label("description"),
  };

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  // async populateMovie() {
  //   try {
  //     const movieId = this.props.match.params.id;
  //     if (movieId === "new") return;
  //     const { data: movie } = await getMovie(movieId);
  //     this.setState({ data: this.mapToViewModel(movie) });
  //   } catch (ex) {
  //     if (ex.response && ex.response.status === 404)
  //       this.props.history.replace("/not-found");
  //   }
  // }

  componentDidMount = async () => {
    await this.populateGenres();
    // await this.populateMovie();
  };

  handleGameUpload = (event) => {
    const game = event.target.files[0];
    this.setState({ game });
  };
  handleImageUpload = (event) => {
    const files = [...this.state.files, event.target.files[0]];
    this.setState({ files });
  };
  doSubmit = async () => {
    const { title, description, genre_id } = this.state.data;
    const {files: images, game: gameFile} = this.state;

    const {data} = await saveGame(title, description, genre_id);
    console.log("data", data);
    if(data !== undefined)
      await postGameFiles(images, gameFile, data.game_id);
    this.props.history.push("/games");
  };
  render() {
    const { genres, game, files } = this.state;
    
    if (!genres) return <></>;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderInput("description", "Description")}
          {this.renderSelect("genre_id", "Genre", genres)}
          <div className="row m-2">
            <input
              className="btn btn-primary"
              type="file"
              onChange={this.handleGameUpload}
            />
            {game && game.name}
          </div>
          <input
            className="btn btn-primary"
            type="file"
            onChange={this.handleImageUpload}
          />
          <div className="row m-4">
            {files && files.map((file) => file && <ImageThumb image={file} />)}
          </div>
          {this.renderButton(" Submit ")}
        </form>
      </div>
    );
  }
}

/**
 * Component to display thumbnail of image.
 */
const ImageThumb = ({ image }) => {
  return (
    <div className="col-2">
      <img
        className="col-12"
        src={URL.createObjectURL(image)}
        alt={image.name}
      />
      <p className="col-12">{image.name}</p>
    </div>
  );
};

export default GameForm;
