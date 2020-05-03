import React, { Component } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { SliderHandle } from './SliderHandle';
import Drawer from '@material-ui/core/Drawer';
import { dimensionMarks, framerateMarks, resolutionMarks } from './SliderMarks';
import { ChromePicker } from 'react-color';
import './GridCustomization.css';
import Button from 'react-bootstrap/Button';

const wrapperStyle = { width: 800, margin: 50 };

class GridCustomization extends Component {
  constructor() {
    super();
    this.state = {
      columns: 10,
      rows: 10,
      framerate: 10,
      resolution: 10,
      cellColor: '#000000',
      backgroundColor: '#FFFFFF',
      right: false,
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
  }

  toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    this.setState({ right: open });
  };

  updateColumns = (val) => {
    this.setState({
      columns: val,
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

  handleCellColorUpdate = (color) => {
    this.setState({ cellColor: color.hex });
  };

  handleBackgroundColorUpdate = (color) => {
    this.setState({ backgroundColor: color.hex });
  };

  render() {
    return (
      <div>
        Home Page!
        <React.Fragment key={'right'}>
          <Button onClick={this.toggleDrawer(true)}>{'Customize'}</Button>
          <Drawer
            anchor={'right'}
            open={this.state.right}
            onClose={this.toggleDrawer(false)}
          >
            Customization
            <div className={'column-slider'} style={wrapperStyle}>
              {`Columns: ${this.state.columns}`}
              <Slider
                onChange={(v) => this.updateColumns(v)}
                min={1}
                max={80}
                marks={dimensionMarks}
                defaultValue={this.state.columns}
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
              ;
            </div>
            <div className={'cell-background-picker'}>
              {`Background Color: ${this.state.backgroundColor}`}
              <ChromePicker
                color={this.state.backgroundColor}
                onChange={this.handleBackgroundColorUpdate}
              />
              ;
            </div>
          </Drawer>
        </React.Fragment>
      </div>
    );
  }
}

export default GridCustomization;
