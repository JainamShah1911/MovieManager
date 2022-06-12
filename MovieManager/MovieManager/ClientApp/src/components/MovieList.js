import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { MovieItem } from './MovieItem';
import { MovieItemModal } from './MovieItemModal';

export class MovieList extends Component {
  static displayName = MovieList.name;

  render() {
    const { movies, loading, handleSearchInputChange, handleDelete, handleEdit, isEditing, cancelEdit, movieInView, formSubmit } = this.props;
    return (
      <div className="container-fluid">
        <div className='row'>
          <div className="form-outline searchInput col-md-10 col-lg-11">
            <input type="search" id="form1" className="form-control" placeholder="Search" aria-label="Search" onChange={handleSearchInputChange} />
          </div>
          <div className='col-md-2 col-lg-1 create-button'>
            <Button
              color="primary"
              type="button"
              onClick={handleEdit}>Create</Button>
          </div>
        </div>
        <div className="row">
          {movies.length !== 0 ? (
            movies.map((movie, key) => (
              <MovieItem movie={movie}
                key={key}
                handleEdit={handleEdit}
                handleDelete={handleDelete}></MovieItem>
            ))
          ) : (
            <h1>{loading ? 'Loading...' : 'No Results'}</h1>
          )}
        </div>
        <MovieItemModal movieInView={movieInView} formSubmit={formSubmit} cancelEdit={cancelEdit} isEditing={isEditing}></MovieItemModal>
      </div>
    );
  }
}
