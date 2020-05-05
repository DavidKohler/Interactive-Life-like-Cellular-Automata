import Button from 'react-bootstrap/Button';
import CellularAutomatonSketch from './CellularAutomatonSketch';
import GridCustomization from './GridCustomization';
import gridToRLE from './RLElogic';
import React, { Component } from 'react';
import SavedRLEModal from './savedRLEModal';

/*
    Component for Random Grid Tab
*/

class RandomGridPage extends Component {
  constructor() {
    super();
    this.state = {
      alivePercentage: 50,
      backgroundColor: '#FFFFFF',
      birthRule: [3],
      cellColor: '#000000',
      cols: 10,
      framerate: 5,
      gridRows: 10,
      myGrid: [],
      refreshVal: 0,
      resolution: 20,
      surviveRule: [2, 3],
    };
    this.renderRef = React.createRef();
    this.resetAutomata = this.resetAutomata.bind(this);
    this.generateGrid = this.generateGrid.bind(this);
    this.saveRLE = this.saveRLE.bind(this);
    this.updateParameters = this.updateParameters.bind(this);
  }

  resetAutomata() {
    // refresh grid by increasing key
    this.setState((state) => ({
      refreshVal: state.refreshVal + 1,
    }));
  }

  createGrid = (r, c, aliveP) => {
    // create grid with random cells
    let grid = new Array(r);
    for (let i = 0; i < grid.length; i++) {
      grid[i] = new Array(c);
    }
    let modifiedProbRandom = Array(100).fill(1).fill(0, aliveP);
    for (let i = 0; i < r; i++) {
      for (let j = 0; j < c; j++) {
        grid[i][j] = modifiedProbRandom[Math.floor(Math.random() * 100)];
      }
    }
    return grid;
  };

  generateGrid() {
    // generate new grid
    let { cols, gridRows, alivePercentage } = this.state;
    let newGrid = this.createGrid(gridRows, cols, alivePercentage);
    if (this.state.myGrid.length > 0) {
      this.resetAutomata();
    }
    this.setState({ myGrid: newGrid });
  }

  saveRLE() {
    // create RLE strings from grid
    let { birthRule, myGrid, surviveRule } = this.state;
    let gridRLE = gridToRLE(myGrid, birthRule, surviveRule);
    console.log(gridRLE);
  }

  updateParameters = (newParams) => {
    // update grid parameters passed up from customization drawer
    this.resetAutomata();
    setTimeout(() => {
      this.setState(
        {
          alivePercentage: newParams.alivePercentage,
          backgroundColor: newParams.backgroundColor,
          birthRule: newParams.birthRule,
          cellColor: newParams.cellColor,
          cols: newParams.cols,
          framerate: newParams.framerate,
          gridRows: newParams.rows,
          resolution: newParams.resolution,
          surviveRule: newParams.surviveRule,
        },
        () => this.generateGrid()
      );
    }, 0);
  };

  render() {
    // render random grid page
    let {
      backgroundColor,
      birthRule,
      cellColor,
      cols,
      framerate,
      gridRows,
      myGrid,
      resolution,
      surviveRule,
    } = this.state;

    // check if grid exists, then render grid
    let displayGrid = myGrid.length > 0;

    return (
      <div className="random-page">
        Random Grid Page!
        <div className="customization-container">
          <GridCustomization
            parentTab={'RANDOM'}
            submitFunction={this.updateParameters}
          />
        </div>
        <div className="generate-grid-container">
          <Button onClick={this.generateGrid}>Create Random Grid</Button>
        </div>
        {displayGrid && (
          <div className="sketch-container">
            <CellularAutomatonSketch
              backgroundColor={backgroundColor}
              birthRule={birthRule}
              cellColor={cellColor}
              cols={cols}
              framerate={framerate}
              grid={myGrid}
              key={this.state.refreshVal}
              refLoc={this.renderRef}
              resolution={resolution}
              rows={gridRows}
              surviveRule={surviveRule}
            />
          </div>
        )}
        {displayGrid && (
          <div className="reset-button-container">
            <Button onClick={this.resetAutomata}>Reset</Button>
          </div>
        )}
        {displayGrid && (
          <div className="save-rle-container">
            <SavedRLEModal
              grid={this.state.myGrid}
              bRule={this.state.birthRule}
              sRule={this.state.surviveRule}
            />
          </div>
        )}
      </div>
    );
  }
}

export default RandomGridPage;

// TODO
// styling
// display RLE
