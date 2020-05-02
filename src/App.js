import React from 'react';
import './App.css';
import CellularAutomaton from './CellularAutomaton';

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
        Hello World
      </div>
    );
  }
}

export default App;
