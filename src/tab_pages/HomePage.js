import Jumbotron from 'react-bootstrap/Jumbotron';
import React, { Component } from 'react';

class HomePage extends Component {
  render() {
    return (
      <div className="homepage-container">
        <div className="jumbo-container">
          <Jumbotron>
            <h1>Interactive Life-like Cellular Automata</h1>
            <br />
            <h5>Welcome! </h5>
            <h5>
              Create, load, and simulate various life-like cellular automata
            </h5>
          </Jumbotron>
        </div>
      </div>
    );
  }
}

export default HomePage;

//TODO
//add homepage text and fluff
//styling
// add user-select: none to text stuff
// add warning about using B0 on other boundless apps
