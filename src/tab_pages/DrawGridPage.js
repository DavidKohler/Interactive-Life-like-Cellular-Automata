import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Drawer from '@material-ui/core/Drawer';
import InteractiveGrid from '../components/InteractiveGrid';
import SavedRLEModal from '../components/SavedRLEModal';
import React, { Component } from 'react';
import Slider from 'rc-slider';
import { SliderHandle } from '../sliders/sliderHandle';
import { dimensionMarks } from '../sliders/sliderMarks';

/*
    Component for Drawing Grid Tab
*/

const wrapperStyle = { width: 800, margin: 50 };

class DrawGridPage extends Component {
  constructor() {
    super();
    this.state = {
      birthRule: [3],
      cols: 10,
      drawerOpen: false,
      grid: [],
      loadGrid: false,
      refreshVal: 0,
      rows: 10,
      surviveRule: [2, 3],
    };
    this.makeGridAppear = this.makeGridAppear.bind(this);
    this.renderRef = React.createRef();
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.updateColumns = this.updateColumns.bind(this);
    this.updateRows = this.updateRows.bind(this);
  }

  handleSubmit = () => {
    // handle click on submit button
    setTimeout(() => {
      this.setState({ drawerOpen: false, grid: [], loadGrid: false });
      let table = document.querySelector('body > table');
      if (table !== null) {
        table.parentNode.removeChild(table);
        this.setState((state) => ({
          refreshTabVal: state.refreshTabVal + 1,
        }));
      }
    }, 0);
  };

  makeGridAppear() {
    // render drawing grid
    this.setState({ loadGrid: true });
  }

  toggleDrawer = (open) => (event) => {
    // toggle opening customization drawer
    this.setState({ drawerOpen: open });
  };

  updateColumns = (val) => {
    // update number of columns in grid
    this.setState({
      cols: val,
    });
  };

  updateRows = (val) => {
    // update number of rows in grid
    this.setState({
      rows: val,
    });
  };

  render() {
    // render page and buttons
    let displayGrid = this.state.loadGrid;
    return (
      <div>
        <div>
          <Accordion defaultActiveKey="0">
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                Click Here to Toggle Page Explanation
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  This is the <b>Draw Automaton</b> page where the user is able
                  to create a grid of their desired size, draw a cellular
                  automaton to their liking, and save this automaton to simulate
                  later in the <b>Load Automaton</b> tab or another application
                  <br />
                  <br />
                  The <b>Resize</b> button opens a drawer that will allow the
                  user to change the dimensions of the grid that will be
                  generated. Change the desired number of rows or columns and
                  hit <b>Submit</b> to save any changes and close the drawer{' '}
                  <br />
                  <br />
                  The <b>Open Grid</b> button then lets the user open the
                  interactive grid of specified size (or 10x10 by default). Now,
                  the user is able to click on any grid cells to toggle them
                  on/off. A blank (white) cell is off or dead, while a filled
                  (black) cell is on or alive <br />
                  <br /> When the user is satisfied with their automaton they
                  have drawn, they may hit the <b>Save Automaton</b> button to
                  open a modal window showing the RLE format of their automaton.
                  The user can now copy the RLE text or click the{' '}
                  <b>Download</b> button to download this RLE to a file
                  <br />
                  <br />
                  RLE (or Run Length Encoded) is a file format commonly used for
                  storing and reading cellular automata patterns. For more
                  information about how it works, visit the{' '}
                  <a
                    href={'https://www.conwaylife.com/wiki/Run_Length_Encoded'}
                  >
                    LifeWiki
                  </a>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
        <div className="customizer-drawer">
          <React.Fragment key={'drawerOpen'}>
            <Button onClick={this.toggleDrawer(true)}>{'Resize'}</Button>
            <Drawer
              anchor={'right'}
              onClose={this.toggleDrawer(false)}
              open={this.state.drawerOpen}
            >
              <div className="column-slider" style={wrapperStyle}>
                <div>
                  Customize dimensions of interactive grid. Remember to hit
                  submit to save changes!
                </div>
                {`Columns: ${this.state.cols}`}
                <Slider
                  defaultValue={this.state.cols}
                  handle={SliderHandle}
                  max={80}
                  marks={dimensionMarks}
                  min={1}
                  onChange={(v) => this.updateColumns(v)}
                />
              </div>
              <div className="row-slider" style={wrapperStyle}>
                {`Rows: ${this.state.rows}`}
                <Slider
                  defaultValue={this.state.rows}
                  handle={SliderHandle}
                  marks={dimensionMarks}
                  max={80}
                  min={1}
                  onChange={(v) => this.updateRows(v)}
                />
              </div>
              <div className="submit-container">
                <Button onClick={this.handleSubmit}>Submit</Button>
              </div>
            </Drawer>
          </React.Fragment>
        </div>
        {displayGrid && (
          <div className="save-rle-container">
            <SavedRLEModal {...this.state} />
          </div>
        )}
        {!displayGrid && (
          <Button onClick={this.makeGridAppear}>{'Open Grid'}</Button>
        )}
        {displayGrid && (
          <InteractiveGrid
            key={this.props.refreshVal}
            rows={this.state.rows}
            cols={this.state.cols}
            refLoc={this.renderRef}
          />
        )}
      </div>
    );
  }
}

export default DrawGridPage;

//TODO
// styling
