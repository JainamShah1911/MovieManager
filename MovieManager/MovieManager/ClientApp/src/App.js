import debounce from 'lodash.debounce';
import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import { Layout } from './components/Layout';
import { MovieList } from './components/MovieList';
import './custom.css';
import confirm from "reactstrap-confirm";


export default class App extends Component {
  //static displayName = App.name;
  state = { isEditing: false, movies: [], totalHits: 0, loading: true, searchInput: "", skip: 0, top: 30, movieInView: null, showToaster: false, alertMessage: null };

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
    this.setState({ movies: data.hits, totalHits: data.totalHits, loading: false });
  }

  handleDelete = async (id) => {
    const movieTitle = this.state.movies.find(t => t.objectId == id)?.title
    let shouldDelete = await confirm({
      title: `Delete ${movieTitle} ?`,
      message: `Are you sure you want to delete ${movieTitle} ?`,
      confirmText: "Delete",
      confirmColor: "danger",
      cancelColor: "primary"
    })
    if (shouldDelete) {
      await fetch(`movies/${id}`, {
        method: 'DELETE', body: null
      }).then((response) => {
        if (response.status == 200) {
          this.setState({
            movies: this.state.movies.filter(i => i.objectId != id),
            totalHits: this.state.totalHits - 1
          });
          this.showAlert("Successfully Deleted Movie");
        }
      });
    }
  };

  formSubmit = async (movie) => {
    if (movie.objectId != null) {
      await fetch(`movies`, {
        method: 'PUT', body: JSON.stringify(movie), headers: this.getHeaders(),
      }).then((response) => {
        if (response.status == 200) {
          setTimeout(() => {
            this.populateMovieData();
          }, 2000);
          this.showAlert("Successfully Updated Movie");
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
        this.showAlert("Successfully Created Movie");
      });
    }
    this.setState({ isEditing: false, movieInView: null });
  };

  showAlert = (message) => {
    this.setState({ showToaster: true, alertMessage: message }, () => {
      window.setTimeout(() => {
        this.setState({ showToaster: false, alertMessage: null })
      }, 2000)
    });
  }

  render() {
    return (
      <Layout>
        <Alert className='alert-custom' color="info" isOpen={this.state.showToaster} >
          {this.state.alertMessage}
        </Alert>
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
            <button className="btn btn-secondary col-md-2 btn-sm" disabled={this.state.totalHits < 30 || this.state.skip == 0} onClick={() => this.previous()}>
              Previous
            </button>
            <button className="btn btn-secondary col-md-2 btn-sm offset-8 btn-sm" disabled={this.state.totalHits < 30 || (this.state.skip + this.state.top) > this.state.totalHits} onClick={() => this.next()}>
              Next
            </button>
          </div>
        </footer>
      </Layout>
    );
  }
}
