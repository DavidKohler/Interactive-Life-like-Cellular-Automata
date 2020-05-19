import React, { Component } from 'react';
import GridDrawing from './GridDrawing';
import Button from 'react-bootstrap/Button';

class DrawGridPage extends Component {
  constructor() {
    super();
    this.state = {
      refreshVal: 0,
      grid: [],
      loadGrid: false,
    };
    this.renderRef = React.createRef();
    this.makeGridAppear = this.makeGridAppear.bind(this);
  }

  makeGridAppear() {
    this.setState({ loadGrid: true });
  }

  render() {
    return (
      <div>
        Draw Grid Page!
        {!this.state.loadGrid && (
          <Button onClick={this.makeGridAppear}>{'Open Grid'}</Button>
        )}
        {this.state.loadGrid && (
          <GridDrawing key={this.props.key} refLoc={this.renderRef} />
        )}
      </div>
    );
  }
}

export default DrawGridPage;

//TODO
// add drawing grid
// convert grid to RLE
// find meaningful boundaries for saved RLE
// run animation from grid sketch
// swtich sketch components
// add UI for customization
// styling
// allow for other rulesets
