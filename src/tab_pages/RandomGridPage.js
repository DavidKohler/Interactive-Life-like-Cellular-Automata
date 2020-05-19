import Button from 'react-bootstrap/Button';
import CellularAutomatonSketch from '../sketches/CellularAutomatonSketch';
import { createGrid } from '../logic/gridLogic';
import GridCustomization from '../components/GridCustomization';
import SavedRLEModal from '../components/SavedRLEModal';
import React, { Component } from 'react';

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
      cellSize: 20,
      cols: 10,
      framerate: 5,
      grid: [],
      refreshVal: 0,
      rows: 10,
      surviveRule: [2, 3],
    };
    this.generateGrid = this.generateGrid.bind(this);
    this.renderRef = React.createRef();
    this.resetAutomata = this.resetAutomata.bind(this);
    this.updateParameters = this.updateParameters.bind(this);
  }

  generateGrid() {
    // generate new grid
    let { cols, rows, alivePercentage } = this.state;
    let newGrid = createGrid(rows, cols, alivePercentage);
    if (this.state.grid.length > 0) {
      // get rid of old grid
      this.resetAutomata();
    }
    this.setState({ grid: newGrid });
  }

  resetAutomata() {
    // refresh grid by increasing key of component
    this.setState((state) => ({
      refreshVal: state.refreshVal + 1,
    }));
  }

  updateParameters = (newParams) => {
    // update grid parameters passed up from customization drawer
    this.resetAutomata();
    setTimeout(() => {
      this.setState({ ...newParams }, () => this.generateGrid());
    }, 0);
  };

  render() {
    // render random grid page
    // check if grid exists, if so, render grid
    let displayGrid = this.state.grid.length > 0;

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
              {...this.state}
              key={this.state.refreshVal}
              refLoc={this.renderRef}
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
            <SavedRLEModal {...this.state} />
          </div>
        )}
      </div>
    );
  }
}

export default RandomGridPage;

// TODO
// styling
// add text explaining page
