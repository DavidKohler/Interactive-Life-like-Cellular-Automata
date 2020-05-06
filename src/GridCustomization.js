import './GridCustomization.css';
import 'rc-slider/assets/index.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { ChromePicker } from 'react-color';
import Drawer from '@material-ui/core/Drawer';
import Slider from 'rc-slider';
import { SliderHandle } from './SliderHandle';
import React, { Component } from 'react';
import {
  cellRatioMarks,
  cellSizeMarks,
  dimensionMarks,
  framerateMarks,
} from './SliderMarks';

const wrapperStyle = { width: 800, margin: 50 };

/*
    Component rendering customization drawer for grid
*/

class GridCustomization extends Component {
  constructor() {
    super();
    this.state = {
      alivePercentage: 50,
      backgroundColor: '#FFFFFF',
      birthRule: [3],
      birthRulePressed: [
        false,
        false,
        false,
        true,
        false,
        false,
        false,
        false,
        false,
      ],
      cellColor: '#000000',
      cols: 10,
      drawerOpen: false,
      framerate: 10,
      cellSize: 20,
      rows: 10,
      surviveRule: [2, 3],
      surviveRulePressed: [
        false,
        false,
        true,
        true,
        false,
        false,
        false,
        false,
        false,
      ],
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

  componentDidMount() {
    // check if rules were passed in (if tab is 'LOADRLE')
    setTimeout(() => {
      if (this.props.parentTab === 'LOADRLE') {
        let bPressed = Array(9).fill(false);
        let sPressed = Array(9).fill(false);
        this.props.bRule.forEach((v) => {
          if (v !== undefined) bPressed[v] = true;
        });
        this.props.sRule.forEach((v) => {
          if (v !== undefined) sPressed[v] = true;
        });
        this.setState({
          birthRule: this.props.bRule,
          birthRulePressed: bPressed,
          surviveRule: this.props.sRule,
          surviveRulePressed: sPressed,
        });
      }
    }, 0);
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
    this.setState({ drawerOpen: false });
    this.props.submitFunction(this.state);
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
      <div className="customizer-drawer">
        <React.Fragment key={'drawerOpen'}>
          <Button onClick={this.toggleDrawer(true)}>{'Customize'}</Button>
          <Drawer
            anchor={'right'}
            onClose={this.toggleDrawer(false)}
            open={this.state.drawerOpen}
          >
            {'Customization'}
            <div className="column-slider" style={wrapperStyle}>
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
            <div className="cell-size-slider" style={wrapperStyle}>
              {`Cell Size: ${this.state.cellSize}`}
              <Slider
                defaultValue={this.state.cellSize}
                handle={SliderHandle}
                marks={cellSizeMarks}
                max={40}
                min={1}
                onChange={(v) => this.updateCellSize(v)}
              />
            </div>
            {this.props.parentTab === 'RANDOM' && (
              <div className="cell-ratio-slider" style={wrapperStyle}>
                {'Alive/Dead Cell Ratio'}
                <Slider
                  defaultValue={this.state.alivePercentage}
                  handle={SliderHandle}
                  marks={cellRatioMarks}
                  max={100}
                  min={0}
                  onChange={(v) => this.updateCellRatio(v)}
                />
              </div>
            )}
            <div className="button-toolbar-container">
              <ButtonToolbar aria-label="Born Rule">
                {`Born Rule: B${this.state.birthRule.map(String).join('')}`}
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
                {`Survive Rule: S${this.state.surviveRule
                  .map(String)
                  .join('')}`}
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
              </ButtonToolbar>
            </div>
            <div className="framerate-slider" style={wrapperStyle}>
              {`Framerate: ${this.state.framerate}`}
              <Slider
                defaultValue={this.state.framerate}
                handle={SliderHandle}
                marks={framerateMarks}
                max={60}
                min={1}
                onChange={(v) => this.updateFramerate(v)}
              />
            </div>
            <div className="color-pickers">
              <div className="cell-color-picker">
                {`Cell Color: ${this.state.cellColor}`}
                <ChromePicker
                  color={this.state.cellColor}
                  onChange={this.handleCellColorUpdate}
                />
              </div>
              <div className="cell-background-picker">
                {`Background Color: ${this.state.backgroundColor}`}
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

// TODO styling
