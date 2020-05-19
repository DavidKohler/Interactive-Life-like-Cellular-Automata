import React, { Component } from 'react';
import GridDrawing from './GridDrawing';
import Button from 'react-bootstrap/Button';
import SavedRLEModal from './SavedRLEModal';

class DrawGridPage extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      loadGrid: false,
      surviveRule: [2, 3],
      birthRule: [3],
    };
    this.renderRef = React.createRef();
    this.makeGridAppear = this.makeGridAppear.bind(this);
  }

  getRLE() {
    let table = document.querySelector('body > table');
    console.log(table);
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
          <GridDrawing
            key={this.props.key}
            rows={10}
            cols={20}
            refLoc={this.renderRef}
          />
        )}
        {this.state.loadGrid && (
          <div className="save-rle-container">
            <SavedRLEModal {...this.state} />
          </div>
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
