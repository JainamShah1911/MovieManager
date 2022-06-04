import debounce from 'lodash.debounce';
import React, { Component } from 'react';
import { Img } from 'react-image';
import DefaultImage from "../assets/Coming-Soon.jpg";

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = { movies: [], loading: true, searchInput: "", skip: 0, top: 30 };
  }

  componentDidMount() {
    this.populateMovieData();
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="form-outline searchInput">
          <input type="search" id="form1" className="form-control" placeholder="Search" aria-label="Search" onChange={this.handleInputChange} />
        </div>
        <div className="row">
          {this.state.movies.length !== 0 ? (
            this.state.movies && this.state.movies.map((card, key) => (
              <div className="col-md-4 col-lg-3">
                <div className="card inverted my-3">
                  <div className="card-thumbnail img-div">
                    <Img className="movieImage img-fluid" src={[card.image, DefaultImage]} />
                  </div>
                  <div className="card-body">
                    <h3 className="card-title"><a href="#" className="text-secondary">{card.title}</a></h3>
                    <p className="card-text"></p>
                    <a href="#" className="btn btn-danger">Read More</a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1>{this.state.loading ? 'Loading...' : 'No Results'}</h1>
          )}
        </div>
      </div>
    );
  }

  handleInputChange = debounce(e => {
    this.setState({
      searchInput: e.target.value,
      loading: true,
      skip: 0,
      top: 30
    });
    this.populateMovieData()
  }, 1000);

  async populateMovieData() {
    const response = await fetch('search', {
      method: 'POST', body: `{ "skip": "${this.state.skip}", "top": "${this.state.top}", "searchKeyword":"${this.state.searchInput}" }`, headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
    const data = await response.json();
    this.setState({ movies: data.hits, loading: false });
  }
}
