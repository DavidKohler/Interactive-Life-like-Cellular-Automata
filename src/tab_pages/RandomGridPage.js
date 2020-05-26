import '../css/RandomGridPage.css';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
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

  componentDidUpdate() {
    // get rid of extra p5js buttons
    let playbuttons = document.getElementById('playbuttonRandom');
    let nextbuttons = document.getElementById('nextbuttonRandom');
    if (playbuttons.children.length > 1) {
      playbuttons.children[0].parentNode.removeChild(playbuttons.children[0]);
    }
    if (nextbuttons.children.length > 1) {
      nextbuttons.children[0].parentNode.removeChild(nextbuttons.children[0]);
    }
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
                  This is the <b>Random Automaton</b> page where the user is
                  able to customize, generate, and simulate random cellular
                  automata
                  <br />
                  <br />
                  The <b>Customize</b> button opens a drawer that will allow the
                  user to change various aspects of the generated automaton and
                  its simulation. They can change the number of columns and
                  rows, the cell size (how large the grid cells appear on the
                  screen), the Alive/Dead cell ratio (the desired ratio of live
                  cells to dead cells for the starting state of the automaton),
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
                  drawer, and create a random automaton <br />
                  <br />
                  The <b>Create Automaton</b> button then lets the user generate
                  a new, random cellular automaton based on the user's
                  customization choices or default values <br />
                  <br />
                  The <b>Play</b> and <b>Next</b> buttons control the simulation
                  of the automaton. When the <b>Play</b> button is pressed, it
                  will start to play an infinite simulation, which may be paused
                  at any time by clicking the <b>Pause</b> button. The{' '}
                  <b>Next</b> button advances forward a single generation on
                  every button press. At any time, the user may hit the{' '}
                  <b>Reset</b> button to reset the automaton back to its initial
                  state
                  <br />
                  <br /> If the user likes an automaton that has been generated,
                  they may hit the <b>Save Automaton</b> button to open a modal
                  window showing the RLE format of their automaton. The user may
                  now copy the RLE text or click the <b>Download</b> button to
                  download this RLE to a file
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
          <div className="customization-container">
            <GridCustomization
              parentTab={'RANDOM'}
              loadGrid={true}
              submitFunction={this.updateParameters}
            />
          </div>
          <div className="generate-grid-container">
            <Button onClick={this.generateGrid}>Create Automaton</Button>
          </div>
          <div className="save-rle-container">
            <SavedRLEModal {...this.state} loadGrid={displayGrid} />
          </div>
        </div>
        {displayGrid && (
          <div className="sketch-container">
            <CellularAutomatonSketch
              {...this.state}
              parentTab="RANDOM"
              key={this.state.refreshVal}
              refLoc={this.renderRef}
            />
          </div>
        )}
        <div className="playback-container">
          <div className="playback-button" id="playbuttonRandom" />
          <div className="playback-button" id="nextbuttonRandom" />
          {displayGrid && <Button onClick={this.resetAutomata}>Reset</Button>}
        </div>
      </div>
    );
  }
}

export default RandomGridPage;
