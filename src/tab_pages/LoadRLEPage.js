import Button from 'react-bootstrap/Button';
import CellularAutomatonSketch from '../sketches/CellularAutomatonSketch';
import GridCustomization from '../components/GridCustomization';
import LoadRLEDrawer from '../components/LoadRLEDrawer';
import { reshapeGrid } from '../logic/gridLogic';
import SavedRLEModal from '../components/SavedRLEModal';
import React, { Component } from 'react';

/*
    Component rendering tab to load RLE
*/

class LoadRLEPage extends Component {
  constructor() {
    super();
    this.state = {
      backgroundColor: '#FFFFFF',
      birthRule: [],
      cellColor: '#000000',
      cellSize: 20,
      changesMade: false,
      cols: 10,
      framerate: 10,
      grid: [],
      loadDrawer: false,
      refreshVal: 0,
      rows: 10,
      surviveRule: [],
    };
    this.renderRef = React.createRef();
    this.resetAutomata = this.resetAutomata.bind(this);
    this.updateGrid = this.updateGrid.bind(this);
    this.updateParameters = this.updateParameters.bind(this);
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

  updateGrid = (newParams) => {
    // update grid from loaded RLE
    setTimeout(() => {
      this.setState({ ...newParams });
    }, 0);
    setTimeout(() => {
      this.resetAutomata();
    }, 0);
  };

  updateParameters = (newParams) => {
    // update grid parameters passed up from customization drawer
    let prevChanges = this.state.changesMade;
    let oldGrid = this.state.grid;
    if (
      newParams.rows !== this.state.rows ||
      newParams.cols !== this.state.cols
    ) {
      this.setState(
        { grid: reshapeGrid(oldGrid, newParams.rows, newParams.cols) },
        this.setState(
          { ...newParams, changesMade: !prevChanges },
          this.resetAutomata()
        )
      );
    } else {
      this.setState(
        { ...newParams, changesMade: !prevChanges },
        this.resetAutomata()
      );
    }
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
        {displayGrid && (
          <div className="customization-container">
            <GridCustomization
              bRule={this.state.birthRule}
              defaultRows={this.state.rows}
              defaultCols={this.state.cols}
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
        {displayGrid && (
          <div className="save-rle-container">
            <SavedRLEModal {...this.state} />
          </div>
        )}
      </div>
    );
  }
}

export default LoadRLEPage;

//TODO
// styling
// add description
