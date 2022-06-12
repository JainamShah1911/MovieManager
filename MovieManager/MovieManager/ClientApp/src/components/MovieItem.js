import React, { Component } from 'react';
import { Img } from 'react-image';
import DefaultImage from "../assets/Coming-Soon.jpg";

export class MovieItem extends Component {
  static displayName = MovieItem.name;
  render() {
    const { movie, handleEdit, handleDelete } = this.props;
    return (
      <div className="col-md-3 col-lg-2">
        <div className="card my-3">
          <div className="card-thumbnail img-div">
            <Img className="movieImage card-img-top img-fluid" src={[movie.image, DefaultImage]} />
          </div>
          <div className="card-body">
            <h4 className="card-title">{movie.title}</h4>
            <p className="card-text"></p>
            <div className='row'>
            <button className="btn btn-secondary col-md-5" onClick={() => handleEdit(movie)}>
              Edit
            </button>
            <button className="btn btn-danger col-md-5 offset-2" onClick={() => handleDelete(movie.objectId)}>
              Delete
            </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
