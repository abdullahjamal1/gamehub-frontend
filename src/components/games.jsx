import React, { Component } from "react";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { getGames } from "../services/gameService";
import { getGenres } from "../services/genreService";
import { paginate } from "../utils/paginate";
import _, { filter } from "lodash";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import SearchBox from "./common/searchBox";
import Card from "./common/card";
import { deleteGame } from "../services/gameService";

class Games extends Component {
  state = {
    games: [],
    genres: [],
    currentPage: 1,
    pageSize: 6,
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
    selectedGenre: null,
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
      games: allGames,
    } = this.state;

    let filtered = allGames;

    if (searchQuery)
      filtered = allGames.filter((g) =>
        g.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre.genre_id)
      filtered = allGames.filter((g) => g.type === selectedGenre.type);

    const sorted = _.orderBy(
      filtered,
      [sortColumn.path],

      [sortColumn.order]
    );

    const games = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: games };
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ genre_id: "", type: "All Genres" }, ...data];

    const { data: games } = await getGames();
    this.setState({ games, genres });
  }

  handleDelete = async (game) => {
    const originalgames = this.state.games;

    const games = originalgames.filter((g) => g._id !== game._id);
    this.setState({ games });

    try {
      await deleteGame(game._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This game has already been deleted");

      this.setState({ games: originalgames });
    }
  };

  handleLike = (game) => {
    const games = [...this.state.games];
    const index = games.indexOf(game);
    games[index] = { ...games[index] };
    games[index].liked = !games[index].liked;
    this.setState({ games });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  render() {
    const { length: count } = this.state.games;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { user } = this.props;
    const { totalCount, data: games } = this.getPageData();

    return (
      <div className="row">
        <div className="col-12 col-sm-2">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <div className="row m-2">
            {user && (
              <Link
                to="/games/new"
                className="btn btn-primary"
                style={{ marginBottom: 20 }}
              >
                New game
              </Link>
            )}
          </div>

          <div className="row m-2">
            <p>showing {totalCount} games in the database</p>

            <SearchBox value={searchQuery} onChange={this.handleSearch} />

            <Card games={games} />

            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Games;
