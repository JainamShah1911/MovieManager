import React, { Component } from 'react';
import { Button, Card, CardBody, CardImg, CardText, CardTitle, FormGroup } from 'reactstrap';

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = { forecasts: [], loading: true };
  }

  componentDidMount() {
    this.populateWeatherData();
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-md-8">
            <Card>
              <div className="cardList">
                {this.state.forecasts.length !== 0 ? (
                  this.state.forecasts.map((card, key) => (
                    <Card style={{ width: '18rem' }}>
                      <CardImg variant="top" src="holder.js/100px180" />
                      <CardBody>
                        <CardTitle>Card Title</CardTitle>
                        <CardText>
                          Some quick example text to build on the card title and make up the bulk of
                          the card's content.
                        </CardText>
                        <Button variant="primary">Go somewhere</Button>
                      </CardBody>
                    </Card>
                  ))
                ) : (
                  <h1>Kart Eklenmemiş..</h1>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  async populateWeatherData() {
    const response = await fetch('search');
    const data = await response.json();
    this.setState({ forecasts: data, loading: false });
  }
}
