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
    let myGrid = [
      [0, 1, 1, 0],
      [0, 1, 0, 1],
      [1, 0, 0, 1],
    ];
    return (
      <div className="App">
        <CellularAutomaton
          refLoc={this.renderRef}
          rows={3}
          cols={4}
          grid={myGrid}
          framerate={1}
          resolution={40}
        />
        Hello World
      </div>
    );
  }
}

export default App;
