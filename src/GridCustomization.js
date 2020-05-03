import React, { Component } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { SliderHandle } from './SliderHandle';
import Drawer from '@material-ui/core/Drawer';
import {
  dimensionMarks,
  framerateMarks,
  resolutionMarks,
  cellRatioMarks,
} from './SliderMarks';
import { ChromePicker } from 'react-color';
import './GridCustomization.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

const wrapperStyle = { width: 800, margin: 50 };

class GridCustomization extends Component {
  constructor() {
    super();
    this.state = {
      cols: 10,
      rows: 10,
      framerate: 10,
      resolution: 10,
      cellColor: '#000000',
      backgroundColor: '#FFFFFF',
      drawerOpen: false,
      bornRulePressed: [
        false,
        false,
        false,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
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
        false,
      ],
      birthRule: [3],
      surviveRule: [2, 3],
      alivePercentage: 50,
    };
    this.updateColumns = this.updateColumns.bind(this);
    this.updateRows = this.updateRows.bind(this);
    this.updateFramerate = this.updateFramerate.bind(this);
    this.updateResolution = this.updateResolution.bind(this);
    this.handleCellColorUpdate = this.handleCellColorUpdate.bind(this);
    this.handleBackgroundColorUpdate = this.handleBackgroundColorUpdate.bind(
      this
    );
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.toggleBornButton = this.toggleBornButton.bind(this);
    this.toggleSurviveButton = this.toggleSurviveButton.bind(this);
    this.updateCellRatio = this.updateCellRatio.bind(this);
  }

  handleSubmit = () => {
    this.setState({ drawerOpen: false });
    this.props.submitFunction(this.state);
  };

  componentDidUpdate() {
    setTimeout(function () {
      let alphaSlider1 = document.querySelector(
        'body > div.MuiDrawer-root.MuiDrawer-modal > div.MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 > div.cell-color-picker > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2)'
      );
      let alphaSlider2 = document.querySelector(
        'body > div.MuiDrawer-root.MuiDrawer-modal > div.MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 > div.cell-background-picker > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2)'
      );
      if (alphaSlider1 !== null)
        alphaSlider1.parentNode.removeChild(alphaSlider1);
      if (alphaSlider2 !== null)
        alphaSlider2.parentNode.removeChild(alphaSlider2);
    }, 0);
  }

  toggleDrawer = (open) => (event) => {
    this.setState({ drawerOpen: open });
  };

  updateColumns = (val) => {
    this.setState({
      cols: val,
    });
  };

  updateRows = (val) => {
    this.setState({
      rows: val,
    });
  };

  updateFramerate = (val) => {
    this.setState({
      framerate: val,
    });
  };

  updateResolution = (val) => {
    this.setState({
      resolution: val,
    });
  };

  updateCellRatio = (val) => {
    this.setState({
      alivePercentage: val,
    });
  };

  handleCellColorUpdate = (color) => {
    this.setState({ cellColor: color.hex });
  };

  handleBackgroundColorUpdate = (color) => {
    this.setState({ backgroundColor: color.hex });
  };

  toggleBornButton = (isPressed, index) => {
    let newPressings = this.state.bornRulePressed.slice(0);
    newPressings[index] = !isPressed;
    this.setState({
      bornRulePressed: newPressings,
      birthRule: newPressings.reduce(
        (out, bool, index) => (bool ? out.concat(index) : out),
        []
      ),
    });
  };

  toggleSurviveButton = (isPressed, index) => {
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
    let { bornRulePressed, surviveRulePressed } = this.state;

    return (
      <div className="customizer-drawer">
        <React.Fragment key={'drawerOpen'}>
          <Button onClick={this.toggleDrawer(true)}>{'Customize'}</Button>
          <Drawer
            anchor={'right'}
            open={this.state.drawerOpen}
            onClose={this.toggleDrawer(false)}
          >
            {'Customization'}
            <ButtonToolbar aria-label="Born Rule">
              {`Born Rule: B${this.state.birthRule.map(String).join('')}`}
              <ButtonGroup className="mr-2" aria-label="born group">
                {bornRulePressed.map((val, ind) => {
                  return (
                    <Button
                      key={ind}
                      onClick={() => this.toggleBornButton(val, ind)}
                      variant={val === true ? 'success' : 'outline-success'}
                    >
                      {ind}
                    </Button>
                  );
                })}
              </ButtonGroup>
              {`Survive Rule: S${this.state.surviveRule.map(String).join('')}`}
              <ButtonGroup className="mr-2" aria-label="survive group">
                {surviveRulePressed.map((val, ind) => {
                  return (
                    <Button
                      key={ind}
                      onClick={() => this.toggleSurviveButton(val, ind)}
                      variant={val === true ? 'success' : 'outline-success'}
                    >
                      {ind}
                    </Button>
                  );
                })}
              </ButtonGroup>
            </ButtonToolbar>
            <div className={'column-slider'} style={wrapperStyle}>
              {`Columns: ${this.state.cols}`}
              <Slider
                onChange={(v) => this.updateColumns(v)}
                min={1}
                max={80}
                marks={dimensionMarks}
                defaultValue={this.state.cols}
                handle={SliderHandle}
              />
            </div>
            <div className={'row-slider'} style={wrapperStyle}>
              {`Rows: ${this.state.rows}`}
              <Slider
                onChange={(v) => this.updateRows(v)}
                min={1}
                max={80}
                marks={dimensionMarks}
                defaultValue={this.state.rows}
                handle={SliderHandle}
              />
            </div>
            {this.props.parentTab === 'RANDOM' && (
              <div
                className={'random-probabilities-slider'}
                style={wrapperStyle}
              >
                {'Alive/Dead Cell Ratio'}
                <Slider
                  onChange={(v) => this.updateCellRatio(v)}
                  min={0}
                  max={100}
                  marks={cellRatioMarks}
                  defaultValue={this.state.alivePercentage}
                  handle={SliderHandle}
                />
              </div>
            )}
            <div className={'framerate-slider'} style={wrapperStyle}>
              {`Framerate: ${this.state.framerate}`}
              <Slider
                onChange={(v) => this.updateFramerate(v)}
                min={1}
                max={60}
                marks={framerateMarks}
                defaultValue={this.state.framerate}
                handle={SliderHandle}
              />
            </div>
            <div className={'resolution-slider'} style={wrapperStyle}>
              {`Resolution: ${this.state.resolution}`}
              <Slider
                onChange={(v) => this.updateResolution(v)}
                min={1}
                max={40}
                marks={resolutionMarks}
                defaultValue={this.state.resolution}
                handle={SliderHandle}
              />
            </div>
            <div className={'cell-color-picker'}>
              {`Cell Color: ${this.state.cellColor}`}
              <ChromePicker
                color={this.state.cellColor}
                onChange={this.handleCellColorUpdate}
              />
            </div>
            <div className={'cell-background-picker'}>
              {`Background Color: ${this.state.backgroundColor}`}
              <ChromePicker
                color={this.state.backgroundColor}
                onChange={this.handleBackgroundColorUpdate}
              />
            </div>
            <Button onClick={this.handleSubmit}>Submit</Button>
          </Drawer>
        </React.Fragment>
      </div>
    );
  }
}

export default GridCustomization;

// TODO styling
