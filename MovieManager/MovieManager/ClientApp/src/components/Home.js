import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardImg, CardText, CardTitle, FormGroup } from 'reactstrap';
import {Img} from 'react-image'
import DefaultImage from "../assets/Coming-Soon.jpg";

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = { movies: [], loading: true };
  }

  componentDidMount() {
    this.populateMovieData();
  }

  render() {
    return (
      <div className="container-fluid">
          <div className="row cardList">
            {this.state.movies.length !== 0 ? (
              this.state.movies && this.state.movies.map((card, key) => (
                <Card bg="dark" className='col-md-3' style={{ width: '18rem', padding: 0 }}>
                  <CardHeader>{card.title}</CardHeader>
                  <Img className="movieImage" src={[card.image, DefaultImage]} />
                  <CardBody>
                    <CardTitle></CardTitle>
                    <CardText>

                    </CardText>
                    <div className='column '>
                      <Button className='col-md-5 col-md-offset-1' variant="primary">View</Button>
                      <Button className='col-md-5 col-md-offset-1' variant="primary">Edit</Button>
                    </div>
                  </CardBody>
                </Card>
              ))
            ) : (
              <h1>Loading...</h1>
            )}
          </div>
        </div>
    );
  }

  async populateMovieData() {
    const response = await fetch('search', {method: 'POST', body: '{ "skip": "100", "top": "30" }',headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
  },});
    const data = await response.json();
    this.setState({ movies: data.hits, loading: false });
  }
}
