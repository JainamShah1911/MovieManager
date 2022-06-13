import React, { Component } from 'react';
import { FcLike } from "react-icons/fc";
import DefaultImage from "../assets/Coming-Soon-D.jpg";

export class MovieItem extends Component {
  static displayName = MovieItem.name;
  render() {
    const { movie, handleEdit, handleDelete } = this.props;
    return (
      <div className="col-md-3 col-lg-2">
        <div className="card my-3">
          <div className="card-thumbnail img-div">
            <img className="movieImage card-img-top img-fluid" src={movie.image} onError={this.getDefaultSrc} />
          </div>
          <div className="card-body">
            <p className="card-title movie-name" title={movie.title}>{movie.title}</p>
            <p className="card-text"><FcLike /> {movie.rating}</p>
            <div className='row'>
              <button className="btn btn-secondary col-md-5 btn-sm" onClick={() => handleEdit(movie)}>
                Edit
              </button>
              <button className="btn btn-danger col-md-5 offset-2 btn-sm" onClick={() => handleDelete(movie.objectId)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  getDefaultSrc = (e) => {
    e.target.src = DefaultImage;
  }
}
