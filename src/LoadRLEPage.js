import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import GridCustomization from './GridCustomization';
import CellularAutomatonSketch from './CellularAutomatonSketch';
import LoadRLEDrawer from './LoadRLEDrawer';

class LoadRLEPage extends Component {
  constructor() {
    super();
    this.state = {
      backgroundColor: '#FFFFFF',
      birthRule: [],
      cellColor: '#000000',
      cellSize: 20,
      cols: 10,
      framerate: 5,
      loadDrawer: false,
      rows: 10,
      grid: [],
      refreshVal: 0,
      surviveRule: [],
    };
    this.renderRef = React.createRef();
    this.resetAutomata = this.resetAutomata.bind(this);
    this.updateParameters = this.updateParameters.bind(this);
    this.updateGrid = this.updateGrid.bind(this);
  }

  readSingleFile = (e) => {
    // read RLE file from upload
    let file = e.target.files[0];
    if (!file) {
      return;
    }
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e) => {
      let contents = e.target.result;
      this.setState({
        file: contents,
      });
    };
  };

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
      this.setState({ ...newParams });
    }, 0);
  };

  updateGrid = (newGrid) => {
    // update grid from loaded RLE
    this.resetAutomata();
    setTimeout(() => {
      this.setState({ grid: newGrid });
    }, 0);
  };

  render() {
    // render random grid page
    // check if grid exists, if so, render grid
    let displayGrid = this.state.grid.length > 0;
    return (
      <div>
        RLE Page!
        <div className="load-drawer-container">
          <LoadRLEDrawer submitFunction={this.updateGrid} />
        </div>
        {this.state.grid}
        {displayGrid && (
          <div className="customization-container">
            <GridCustomization
              bRule={this.state.birthRule}
              parentTab={'LOADRLE'}
              sRule={this.state.surviveRule}
              submitFunction={this.updateParameters}
            />
          </div>
        )}
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
      </div>
    );
  }
}

export default LoadRLEPage;

//TODO
// load in RLE grids
// add animation
// add UI customization
// add padding for RLE input grids
// styling
// allow for other rulesets
