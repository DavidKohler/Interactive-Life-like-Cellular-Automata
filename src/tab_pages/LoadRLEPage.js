import '../css/LoadRLEPage.css';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CellularAutomatonSketch from '../sketches/CellularAutomatonSketch';
import GridCustomization from '../components/GridCustomization';
import LoadRLEDrawer from '../components/LoadRLEDrawer';
import { reshapeGrid } from '../logic/gridLogic';
import SavedRLEModal from '../components/SavedRLEModal';
import React, { Component } from 'react';

/*
    Component for tab to load RLE
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
      loadGrid: false,
      refreshVal: 0,
      rows: 10,
      surviveRule: [],
    };
    this.renderRef = React.createRef();
    this.resetAutomata = this.resetAutomata.bind(this);
    this.updateGrid = this.updateGrid.bind(this);
    this.updateParameters = this.updateParameters.bind(this);
  }

  componentDidUpdate() {
    // get rid of extra p5js buttons
    let playbuttons = document.getElementById('playbutton');
    let nextbuttons = document.getElementById('nextbutton');
    if (playbuttons.children.length > 1) {
      playbuttons.children[0].parentNode.removeChild(playbuttons.children[0]);
    }
    if (nextbuttons.children.length > 1) {
      nextbuttons.children[0].parentNode.removeChild(nextbuttons.children[0]);
    }
  }

  resetAutomata() {
    // refresh grid by increasing key of component
    this.setState((state) => ({
      refreshVal: state.refreshVal + 1,
    }));
  }

  updateGrid = (newParams) => {
    // update grid from loaded RLE
    setTimeout(() => {
      this.setState({ ...newParams, loadGrid: true });
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
        <div className="accordion-container">
          <Accordion defaultActiveKey="">
            <Card>
              <Accordion.Toggle
                as={Card.Header}
                eventKey="0"
                style={{ cursor: 'pointer' }}
              >
                Click Here to Toggle Page Explanation
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  This is the <b>Load Automaton</b> page where the user is able
                  to load a cellular automaton, customize it if desired, and
                  simulate it
                  <br />
                  <br />
                  The <b>Load RLE</b> button opens a drawer that will allow the
                  user to load in an automaton. The user may choose{' '}
                  <b>Upload File</b> from the dropdown to upload an RLE file
                  with the .rle file extension from their computer by then
                  clicking on the <b>Choose File</b> button. Otherwise, the
                  dropdown also contains a list of several somewhat notable
                  cellular automata that come ready to load. The user must hit{' '}
                  <b>Submit</b> to load their automaton and save any changes
                  <br />
                  <br />
                  The <b>Customize</b> button opens a drawer that will allow the
                  user to change various aspects of the automaton and its
                  simulation. They can change the number of columns and rows,
                  the cell size (how large the grid cells appear on the screen),
                  birth and survival rules (rules which govern how cells are
                  born and survive through each generation -- for more info
                  about rules visit{' '}
                  <a
                    href={
                      'https://www.conwaylife.com/wiki/Cellular_automaton#Rules'
                    }
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    LifeWiki
                  </a>
                  ), framerate (the speed at which the simulation runs), and
                  finally the live cell and dead cell colors (purely aesthetic).
                  The user may hit <b>Submit</b> to save any changes, close the
                  drawer, and display the changes <br />
                  <br />
                  Once the user's automaton has been successfully loaded, the
                  automaton will appear along with several new buttons. The{' '}
                  <b>Play</b> and <b>Next</b> buttons control the simulation of
                  the automaton. When the <b>Play</b> button is pressed, it will
                  start to play an infinite simulation, which may be paused at
                  any time by clicking the <b>Pause</b> button. The <b>Next</b>{' '}
                  button advances forward a single generation on every button
                  press. At any time, the user may hit the <b>Reset</b> button
                  to reset the automaton back to its initial state
                  <br />
                  <br /> The <b>Save Automaton</b> button opens a modal window
                  showing the RLE format of the automaton being simulated, even
                  if it has been modified from whatever was initially passed in.
                  The user may now copy the RLE text or click the{' '}
                  <b>Download</b> button to download this RLE to a file
                  <br />
                  <br />
                  RLE (or Run Length Encoded) is a file format commonly used for
                  storing and reading cellular automata patterns. For more
                  information about how it works, visit the{' '}
                  <a
                    href={'https://www.conwaylife.com/wiki/Run_Length_Encoded'}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    LifeWiki
                  </a>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
        <div className="load-page-buttons">
          <div className="load-drawer-container">
            <LoadRLEDrawer submitFunction={this.updateGrid} />
          </div>
          <div className="customization-container">
            <GridCustomization
              bRule={this.state.birthRule}
              defaultRows={this.state.rows}
              defaultCols={this.state.cols}
              loadGrid={displayGrid}
              parentTab={'LOADRLE'}
              sRule={this.state.surviveRule}
              submitFunction={this.updateParameters}
            />
          </div>
          <div className="save-rle-container">
            <SavedRLEModal {...this.state} loadGrid={displayGrid} />
          </div>
        </div>
        {displayGrid && (
          <div className="sketch-container">
            <CellularAutomatonSketch
              {...this.state}
              parentTab="LOAD"
              key={this.state.refreshVal}
              refLoc={this.renderRef}
            />
          </div>
        )}
        <div className="playback-container">
          <div className="playback-button" id="playbutton" />
          <div className="playback-button" id="nextbutton" />
          {displayGrid && <Button onClick={this.resetAutomata}>Reset</Button>}
        </div>
      </div>
    );
  }
}

export default LoadRLEPage;
