import React from 'react';
import logo from './logo.svg';
import './App.css';
import p5 from 'p5';
import CellularAutomaton from './CA';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      simStatus: 'PAUSED',
    };
    this.renderRef = React.createRef();
  }

  render() {
    return (
      <div className="App">
        <CellularAutomaton refLoc={this.renderRef} />
      </div>
    );
  }
}

export default App;
