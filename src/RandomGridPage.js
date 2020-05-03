import React, { Component } from 'react';
import CellularAutomatonSketch from './CellularAutomatonSketch';
import Button from 'react-bootstrap/Button';

class RandomGridPage extends Component {
  constructor() {
    super();
    this.state = {
      refreshVal: 0,
      cols: 10,
      rows: 10,
      framerate: 60,
      resolution: 20,
      myGrid: [],
    };
    this.renderRef = React.createRef();
    this.resetAutomata = this.resetAutomata.bind(this);
    this.generateGrid = this.generateGrid.bind(this);
  }

  resetAutomata() {
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
    if (this.state.myGrid.length > 0) {
      this.resetAutomata();
    }
    this.setState({ myGrid: newGrid });
  }
  render() {
    let { cols, rows, framerate, resolution, myGrid } = this.state;

    let displayResetButton = myGrid.length > 0;
    return (
      <div>
        Random Grid Page!
        <Button onClick={this.generateGrid}>Create Random Grid</Button>
        {myGrid.length > 0 && (
          <CellularAutomatonSketch
            refLoc={this.renderRef}
            rows={rows}
            cols={cols}
            grid={myGrid}
            framerate={framerate}
            resolution={resolution}
            key={this.state.refreshVal}
          />
        )}
        {displayResetButton && (
          <Button onClick={this.resetAutomata}>Reset</Button>
        )}
      </div>
    );
  }
}

export default RandomGridPage;

// TODO
// save grid to RLE
// UI for changing parameters
// find meaningful boundaries for saved RLE grids
// styling
// allow for different rulesets
