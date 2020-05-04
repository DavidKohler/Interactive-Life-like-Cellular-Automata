import React, { Component } from 'react';
import CellularAutomatonSketch from './CellularAutomatonSketch';
import Button from 'react-bootstrap/Button';
import GridCustomization from './GridCustomization';
import gridToRLE from './RLElogic';

class RandomGridPage extends Component {
  constructor() {
    super();
    this.state = {
      refreshVal: 0,
      cols: 10,
      rows: 10,
      framerate: 5,
      resolution: 20,
      cellColor: '#000000',
      backgroundColor: '#FFFFFF',
      myGrid: [],
      birthRule: [3],
      surviveRule: [2, 3],
      alivePercentage: 50,
    };
    this.renderRef = React.createRef();
    this.resetAutomata = this.resetAutomata.bind(this);
    this.generateGrid = this.generateGrid.bind(this);
    this.updateParameters = this.updateParameters.bind(this);
    this.saveRLE = this.saveRLE.bind(this);
  }

  saveRLE() {
    const { myGrid, birthRule, surviveRule } = this.state;
    let gridRLE = gridToRLE(myGrid, birthRule, surviveRule);
    console.log(gridRLE);
  }

  updateParameters = (newParams) => {
    this.setState({
      cols: newParams.cols,
      rows: newParams.rows,
      framerate: newParams.framerate,
      resolution: newParams.resolution,
      birthRule: newParams.birthRule,
      surviveRule: newParams.surviveRule,
      cellColor: newParams.cellColor,
      backgroundColor: newParams.backgroundColor,
      alivePercentage: newParams.alivePercentage,
    });
    this.resetAutomata();
  };

  resetAutomata() {
    let elem = document.querySelector('body > button');
    if (elem !== null) elem.parentNode.removeChild(elem);
    this.setState((state) => ({
      refreshVal: state.refreshVal + 1,
    }));
  }

  createGrid = (cols, rows, aliveP) => {
    let grid = new Array(rows);
    for (let i = 0; i < grid.length; i++) {
      grid[i] = new Array(cols);
    }
    let modifiedProbRandom = Array(100).fill(1).fill(0, aliveP);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid[i][j] = modifiedProbRandom[Math.floor(Math.random() * 100)];
      }
    }
    return grid;
  };

  generateGrid() {
    let { cols, rows, alivePercentage } = this.state;
    console.log(rows);
    let newGrid = this.createGrid(cols, rows, alivePercentage);
    if (this.state.myGrid.length > 0) {
      this.resetAutomata();
    }
    this.setState({ myGrid: newGrid });
  }
  render() {
    let {
      cols,
      rows,
      framerate,
      resolution,
      myGrid,
      birthRule,
      surviveRule,
      cellColor,
      backgroundColor,
    } = this.state;
    let displayResetButton = myGrid.length > 0;
    console.log(this.state);
    return (
      <div>
        Random Grid Page!
        <GridCustomization
          submitFunction={this.updateParameters}
          parentTab={'RANDOM'}
        />
        <Button onClick={this.generateGrid}>Create Random Grid</Button>
        {myGrid.length > 0 && (
          <CellularAutomatonSketch
            refLoc={this.renderRef}
            rows={rows}
            cols={cols}
            grid={myGrid}
            framerate={framerate}
            resolution={resolution}
            birthRule={birthRule}
            surviveRule={surviveRule}
            cellColor={cellColor}
            backgroundColor={backgroundColor}
            key={this.state.refreshVal}
          />
        )}
        {displayResetButton && (
          <Button onClick={this.resetAutomata}>Reset</Button>
        )}
        {displayResetButton && (
          <Button onClick={this.saveRLE}>Get RLE Pattern</Button>
        )}
      </div>
    );
  }
}

export default RandomGridPage;

// TODO
// save grid to RLE
// find meaningful boundaries for saved RLE grids
// styling
