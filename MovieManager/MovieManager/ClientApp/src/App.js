import debounce from 'lodash.debounce';
import React, { Component } from 'react';
import { Layout } from './components/Layout';
import { MovieList } from './components/MovieList';
import './custom.css';


export default class App extends Component {
  //static displayName = App.name;
  state = { isEditing: false, movies: [], loading: true, searchInput: "", skip: 0, top: 30, movieInView: null };

  componentDidMount() {
    this.populateMovieData();
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

  handleEdit = (item) => {
    this.setState({ isEditing: true, movieInView: item });
  };

  cancelEdit = () => {
    this.setState({ isEditing: false, movieInView: null });
  }

  next = () => {
    this.setState({ loading: true, skip: this.state.skip + this.state.top }, this.populateMovieData);
  };

  previous = () => {
    this.setState({ loading: true, skip: this.state.skip - this.state.top }, this.populateMovieData);
  }

  // fetch calls
  getHeaders() {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
  }

  async populateMovieData() {
    const response = await fetch('search', {
      method: 'POST', body: `{ "skip": "${this.state.skip}", "top": "${this.state.top}", "searchKeyword":"${this.state.searchInput}" }`, headers: this.getHeaders(),
    });
    const data = await response.json();
    this.setState({ movies: data.hits, loading: false });
  }

  async handleDelete(id) {
    await fetch(`movies/${id}`, {
      method: 'DELETE', body: null, headers: this.getHeaders(),
    }).then(() => {
      setTimeout(() => {
        this.populateMovieData();
      }, 2000); 
    });
  };

  formSubmit = async (movie) => {
    if (movie.objectId != null) {
      await fetch(`movies`, {
        method: 'PUT', body: JSON.stringify(movie), headers: this.getHeaders(),//`{"title": "${movie.title}", "objectId": "${movie.objectId}"}`, headers: this.getHeaders(),
      }).then((response) => {
        if(response.status == 200){
          setTimeout(() => {
            this.populateMovieData();
          }, 2000); 
        }
      });
    }
    else {
      await fetch(`movies`, {
        method: 'POST', body: JSON.stringify(movie), headers: this.getHeaders(),
      }).then(() => {
        setTimeout(() => {
          this.populateMovieData();
        }, 2000); 
      });
    }
    this.setState({ isEditing: false, movieInView: null });
  };

  render() {
    return (
      <Layout>
        <MovieList
          movies={this.state.movies}
          handleSearchInputChange={this.handleInputChange}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
          cancelEdit={this.cancelEdit}
          isEditing={this.state.isEditing}
          movieInView={this.state.movieInView}
          formSubmit={this.formSubmit}
        />
        <footer className="footer">
          <div className='row paginator'>
            <button className="btn btn-secondary col-md-2 btn-sm" disabled={this.state.skip == 0} onClick={() => this.previous()}>
              Previous
            </button>
            <button className="btn btn-secondary col-md-2 btn-sm offset-8 btn-sm" disabled={this.state.movies?.length < 30} onClick={() => this.next()}>
              Next
            </button>
          </div>
        </footer>
      </Layout>
    );
  }
}
