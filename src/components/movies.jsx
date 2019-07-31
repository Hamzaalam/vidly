import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like"
import Pagination from "./common/pagination";
import {paginate} from "../utils/paginate"

class Movies extends Component {
  state = {
    movies: getMovies(),
    currentPage: 1,
    pageSize: 4
  };

  renderMovies = () => {};
  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };
  handleLike = movie =>{
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = {...movies[index]};
    movies[index].liked = !movies[index].liked;
    this.setState({movies})
  };

  handlePageChange = page => {
  this.setState({currentPage:page})
  };
  
  render() {
    const { length: count } = this.state.movies;
    const { currentPage, pageSize , movies: allMovies } =this.state;
    const movies = paginate(allMovies,pageSize,currentPage)

    if (count === 0)
      return <p>There are no movies to display comeback later</p>;
    return (
      <div>
        <p>Showing {count} movie in the database</p>
        <table className="table">
          <thead>
            <tr>
              <th>tittle</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {movies.map(movie => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like onClick={() =>this.handleLike(movie)}
                        liked={movie.liked}
                        
                  />
                </td>
                <td>
                  <button
                    onClick={() => this.handleDelete(movie)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
                  itemsCount={count}
                  currentPage = {currentPage}
                  pageSize={pageSize}
                  onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default Movies;
