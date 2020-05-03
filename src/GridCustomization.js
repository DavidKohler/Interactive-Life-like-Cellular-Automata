import React, { Component } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { SliderHandle } from './SliderHandle';
import { dimensionMarks, framerateMarks, resolutionMarks } from './SliderMarks';
import { CompactPicker } from 'react-color';
import './GridCustomization.css';

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
    };
    this.updateColumns = this.updateColumns.bind(this);
    this.updateRows = this.updateRows.bind(this);
    this.updateFramerate = this.updateFramerate.bind(this);
    this.updateResolution = this.updateResolution.bind(this);
    this.handleCellColorUpdate = this.handleCellColorUpdate.bind(this);
    this.handleBackgroundColorUpdate = this.handleBackgroundColorUpdate.bind(
      this
    );
  }

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
          Cell Color
          <CompactPicker
            color={this.state.cellColor}
            onChangeComplete={this.handleCellColorUpdate}
          />
          ;
        </div>
        <div className={'cell-background-picker'}>
          Background Color
          <CompactPicker
            color={this.state.backgroundColor}
            onChangeComplete={this.handleBackgroundColorUpdate}
          />
          ;
        </div>
      </div>
    );
  }
}

export default GridCustomization;
