import '../css/GridCustomization.css';
import 'rc-slider/assets/index.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { ChromePicker } from 'react-color';
import Drawer from '@material-ui/core/Drawer';
import HelpIcon from '@material-ui/icons/Help';
import Slider from 'rc-slider';
import { SliderHandle } from '../sliders/sliderHandle';
import React, { Component } from 'react';
import {
  cellRatioMarks,
  cellSizeMarks,
  dimensionMarks,
  framerateMarks,
} from '../sliders/sliderMarks';

const wrapperStyle = { width: 600, margin: 50 };

/*
    Component rendering customization drawer for grid
*/

class GridCustomization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alivePercentage: 50,
      backgroundColor: '#FFFFFF',
      birthRule: this.props.bRule !== undefined ? this.props.bRule : [3],
      birthRulePressed:
        this.props.bRule !== undefined
          ? Array(9)
              .fill(false)
              .map((v, i) => (this.props.bRule.includes(i) ? true : false))
          : Array(9).fill(false).fill(true, 3, 4),
      cellColor: '#000000',
      cols: this.props.defaultCols !== undefined ? this.props.defaultCols : 10,
      drawerOpen: false,
      framerate: 10,
      loadedUpdate: false,
      cellSize: 20,
      rows: this.props.defaultRows !== undefined ? this.props.defaultRows : 10,
      surviveRule: this.props.sRule !== undefined ? this.props.sRule : [2, 3],
      surviveRulePressed:
        this.props.sRule !== undefined
          ? Array(9)
              .fill(false)
              .map((v, i) => (this.props.sRule.includes(i) ? true : false))
          : Array(9).fill(false).fill(true, 2, 4),
    };

    this.handleBackgroundColorUpdate = this.handleBackgroundColorUpdate.bind(
      this
    );
    this.handleCellColorUpdate = this.handleCellColorUpdate.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.updateBornButtons = this.updateBornButtons.bind(this);
    this.updateCellRatio = this.updateCellRatio.bind(this);
    this.updateCellSize = this.updateCellSize.bind(this);
    this.updateColumns = this.updateColumns.bind(this);
    this.updateFramerate = this.updateFramerate.bind(this);
    this.updateRows = this.updateRows.bind(this);
    this.updateSurviveButtons = this.updateSurviveButtons.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    // check if new rules were passed in (if tab is 'LOADRLE')
    if (this.props.parentTab === 'LOADRLE' && prevProps !== this.props) {
      setTimeout(() => {
        let bPressed = Array(9).fill(false);
        let sPressed = Array(9).fill(false);
        this.props.bRule.forEach((v) => {
          if (v !== undefined) bPressed[v] = true;
        });
        this.props.sRule.forEach((v) => {
          if (v !== undefined) sPressed[v] = true;
        });
        this.setState({
          rows: this.props.defaultRows,
          cols: this.props.defaultCols,
          birthRule: this.props.bRule,
          birthRulePressed: bPressed,
          surviveRule: this.props.sRule,
          surviveRulePressed: sPressed,
          loadedUpdate: true,
        });
      }, 0);
    }
  }

  handleBackgroundColorUpdate = (color) => {
    // update color of background of grid
    this.setState({ backgroundColor: color.hex });
  };

  handleCellColorUpdate = (color) => {
    // update color of live cells in grid
    this.setState({ cellColor: color.hex });
  };

  handleSubmit = () => {
    // handle click on submit button, activate parent submit function
    this.props.submitFunction(this.state);
    this.setState({ drawerOpen: false });
  };

  toggleDrawer = (open) => (event) => {
    // toggle opening customization drawer
    this.setState({ drawerOpen: open });
  };

  updateBornButtons = (isPressed, index) => {
    // update birth rule and which buttons are pressed
    let newPressings = this.state.birthRulePressed.slice(0);
    newPressings[index] = !isPressed;
    this.setState({
      birthRulePressed: newPressings,
      birthRule: newPressings.reduce(
        (out, bool, index) => (bool ? out.concat(index) : out),
        []
      ),
    });
  };

  updateCellRatio = (val) => {
    // update percentage of live vs dead cells in grid
    this.setState({
      alivePercentage: val,
    });
  };

  updateCellSize = (val) => {
    // update cell size of sketch
    this.setState({
      cellSize: val,
    });
  };

  updateColumns = (val) => {
    // update number of columns in grid
    this.setState({
      cols: val,
    });
  };

  updateFramerate = (val) => {
    // update framerate for sketch
    this.setState({
      framerate: val,
    });
  };

  updateRows = (val) => {
    // update number of rows in grid
    this.setState({
      rows: val,
    });
  };

  updateSurviveButtons = (isPressed, index) => {
    // update survive rule and which buttons are pressed
    let newPressings = this.state.surviveRulePressed.slice(0);
    newPressings[index] = !isPressed;
    this.setState({
      surviveRulePressed: newPressings,
      surviveRule: newPressings.reduce(
        (out, bool, index) => (bool ? out.concat(index) : out),
        []
      ),
    });
  };

  render() {
    // render customization drawer and toggle button
    let { birthRulePressed, surviveRulePressed } = this.state;

    return (
      <div className="customizer-drawer-container">
        <React.Fragment key={'drawerOpen'}>
          <Button
            onClick={this.toggleDrawer(true)}
            disabled={!this.props.loadGrid}
            variant={this.props.loadGrid ? 'primary' : 'secondary'}
          >
            {'Customize'}
          </Button>
          <Drawer
            anchor={'right'}
            onClose={this.toggleDrawer(false)}
            open={this.state.drawerOpen}
            className="customization-drawer"
          >
            <div className="drawer-header">
              Customize automaton and grid below <br />
              <br />
              Remember to hit submit to save changes!
            </div>
            <div className="column-slider" style={wrapperStyle}>
              <div className="column-header">
                {`Columns: ${this.state.cols}`}
              </div>
              <Slider
                defaultValue={this.state.cols}
                handle={SliderHandle}
                max={80}
                marks={dimensionMarks}
                min={1}
                onChange={(v) => this.updateColumns(v)}
                style={{ 'user-select': 'none' }}
              />
            </div>
            <div className="row-slider" style={wrapperStyle}>
              <div className="row-header">{`Rows: ${this.state.rows}`}</div>
              <Slider
                defaultValue={this.state.rows}
                handle={SliderHandle}
                marks={dimensionMarks}
                max={80}
                min={1}
                onChange={(v) => this.updateRows(v)}
                style={{ 'user-select': 'none' }}
              />
            </div>
            <div className="cell-size-slider" style={wrapperStyle}>
              <div className="cell-header">
                {`Cell Size: ${this.state.cellSize}`}
              </div>
              <Slider
                defaultValue={this.state.cellSize}
                handle={SliderHandle}
                marks={cellSizeMarks}
                max={40}
                min={1}
                onChange={(v) => this.updateCellSize(v)}
                style={{ 'user-select': 'none' }}
              />
            </div>
            {this.props.parentTab === 'RANDOM' && (
              <div className="cell-ratio-slider" style={wrapperStyle}>
                <div className="cell-header">{'Alive/Dead Cell Ratio'}</div>
                <Slider
                  defaultValue={this.state.alivePercentage}
                  handle={SliderHandle}
                  marks={cellRatioMarks}
                  max={100}
                  min={0}
                  onChange={(v) => this.updateCellRatio(v)}
                  style={{ 'user-select': 'none' }}
                />
              </div>
            )}
            <div className="button-toolbar-container">
              <ButtonToolbar
                aria-label="Born Rule"
                style={{ 'user-select': 'none' }}
                className="rule-button-container"
              >
                <div className="birth-button-toolbar-container">
                  <div className="rule-header">
                    {`Born Rule: B${this.state.birthRule.map(String).join('')}`}
                    <div className="help-icon">
                      <a
                        href="https://www.conwaylife.com/wiki/Cellular_automaton#Well-known_life-like_cellular_automata"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <HelpIcon />
                      </a>
                    </div>
                  </div>
                  <ButtonGroup className="mr-2" aria-label="born group">
                    {birthRulePressed.map((val, ind) => {
                      return (
                        <Button
                          key={ind}
                          onClick={() => this.updateBornButtons(val, ind)}
                          variant={val === true ? 'success' : 'outline-success'}
                        >
                          {ind}
                        </Button>
                      );
                    })}
                  </ButtonGroup>
                </div>
                <div className="survive-button-toolbar-container">
                  <div className="rule-header">
                    {`Survive Rule: S${this.state.surviveRule
                      .map(String)
                      .join('')}`}
                  </div>
                  <ButtonGroup className="mr-2" aria-label="survive group">
                    {surviveRulePressed.map((val, ind) => {
                      return (
                        <Button
                          key={ind}
                          onClick={() => this.updateSurviveButtons(val, ind)}
                          variant={val === true ? 'success' : 'outline-success'}
                        >
                          {ind}
                        </Button>
                      );
                    })}
                  </ButtonGroup>
                </div>
              </ButtonToolbar>
            </div>
            <div className="framerate-slider" style={wrapperStyle}>
              <div className="framerate-header">
                {`Framerate: ${this.state.framerate}`}
              </div>
              <Slider
                defaultValue={this.state.framerate}
                handle={SliderHandle}
                marks={framerateMarks}
                max={60}
                min={1}
                onChange={(v) => this.updateFramerate(v)}
                style={{ 'user-select': 'none' }}
              />
            </div>
            <div className="color-pickers">
              <div className="cell-color-picker">
                <div className="cell-header">
                  {`Live Cell Color: ${this.state.cellColor}`}
                </div>
                <ChromePicker
                  color={this.state.cellColor}
                  onChange={this.handleCellColorUpdate}
                />
              </div>
              <div className="cell-background-picker">
                <div className="cell-header">
                  {`Dead Cell Color: ${this.state.backgroundColor}`}
                </div>
                <ChromePicker
                  color={this.state.backgroundColor}
                  onChange={this.handleBackgroundColorUpdate}
                />
              </div>
            </div>
            <div className="submit-container">
              <Button onClick={this.handleSubmit}>Submit</Button>
            </div>
          </Drawer>
        </React.Fragment>
      </div>
    );
  }
}

export default GridCustomization;
