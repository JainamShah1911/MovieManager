import React, { Component } from 'react';
import { MovieItem } from './MovieItem';

export class MovieList extends Component {
  static displayName = MovieList.name;

  render() {
    const { movies, loading, handleSearchInputChange, handleEdit, handleDelete } = this.props;
    return (
      <div className="container-fluid">
        <div className="form-outline searchInput">
          <input type="search" id="form1" className="form-control" placeholder="Search" aria-label="Search" onChange={handleSearchInputChange} />
        </div>
        <div className="row">
          {movies.length !== 0 ? (
            movies.map((movie, key) => (
              <MovieItem movie={movie}
              handleEdit={handleEdit}
              handleDelete={handleDelete}></MovieItem>
            ))
          ) : (
            <h1>{loading ? 'Loading...' : 'No Results'}</h1>
          )}
        </div>
      </div>
    );
  }
}
