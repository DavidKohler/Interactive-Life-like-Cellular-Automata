import React from 'react';
import './App.css';
import CellularAutomaton from './CellularAutomaton';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      refreshVal: 0,
      cols: 10,
      rows: 10,
      framerate: 5,
      resolution: 20,
      myGrid: [],
    };
    this.renderRef = React.createRef();
    this.refreshAutomata = this.refreshAutomata.bind(this);
    this.generateGrid = this.generateGrid.bind(this);
  }

  refreshAutomata() {
    let elem = document.querySelector('body > button');
    elem.parentNode.removeChild(elem);
    this.setState((state) => ({
      refreshVal: state.refreshVal + 1,
    }));
  }

  createGrid = (cols, rows) => {
    let grid = new Array(rows);
    for (let i = 0; i < grid.length; i++) {
      grid[i] = new Array(cols);
    }
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid[i][j] = Math.floor(Math.random() * Math.floor(2));
      }
    }
    return grid;
  };

  generateGrid() {
    let { cols, rows } = this.state;
    let newGrid = this.createGrid(cols, rows);
    this.setState({ myGrid: newGrid });
  }

  render() {
    let { cols, rows, framerate, resolution, myGrid } = this.state;
    return (
      <div className="App">
        <button onClick={this.generateGrid}>Create Random Grid</button>
        {myGrid.length > 0 && (
          <CellularAutomaton
            refLoc={this.renderRef}
            rows={rows}
            cols={cols}
            grid={myGrid}
            framerate={framerate}
            resolution={resolution}
            key={this.state.refreshVal}
          />
        )}
        Hello World
        <button onClick={this.refreshAutomata}>Reset</button>
      </div>
    );
  }
}

export default App;
