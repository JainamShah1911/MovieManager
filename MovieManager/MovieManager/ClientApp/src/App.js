import debounce from 'lodash.debounce';
import React, { Component } from 'react';
import { Layout } from './components/Layout';
import { MovieList } from './components/MovieList';
import './custom.css';


export default class App extends Component {
  //static displayName = App.name;
  state = { movies: [], loading: true, searchInput: "", skip: 0, top: 30 };

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

  handleEdit = (item) => {
    //this.setState({ activeItem: item, editItem: true });
    // alert("Edit :: " + JSON.stringify(item));
  };

  async handleDelete(id) {
    const response = await fetch(`movies/${id}`, {
      method: 'DELETE', body: null, headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
    const data = await response.json();
    this.setState({ movies: data.hits, loading: false });
  };

  render() {
    return (
      <Layout>
        <MovieList
          movies={this.state.movies}
          handleSearchInputChange={this.handleInputChange}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
        />
      </Layout>
    );
  }
}
