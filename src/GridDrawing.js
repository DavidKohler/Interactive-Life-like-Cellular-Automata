import './GridDrawing.css';
import React, { Component } from 'react';

class GridDrawing extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
    };
  }

  componentDidMount() {
    let grid = this.clickableGrid(this.props.rows, this.props.cols, function (
      el,
      row,
      col
    ) {
      //   console.log('You clicked on element:', el);
      //   console.log('You clicked on row:', row);
      //   console.log('You clicked on col:', col);
      if (el.className === 'clicked') {
        el.className = '';
      } else {
        el.className = 'clicked';
      }
    });

    document.body.appendChild(grid);
  }

  clickableGrid = (rows, cols, callback) => {
    // Function that handles clickable grid
    // Credit to Phrogz from stackoverflow
    let grid = document.createElement('table');
    grid.className = 'grid';
    for (let r = 0; r < rows; ++r) {
      let tr = grid.appendChild(document.createElement('tr'));
      for (let c = 0; c < cols; ++c) {
        let cell = tr.appendChild(document.createElement('td'));
        cell.addEventListener(
          'click',
          (function (el, r, c) {
            return function () {
              callback(el, r, c);
            };
          })(cell, r, c),
          false
        );
      }
    }
    return grid;
  };

  render() {
    // render to parent component
    return (
      <div className="GridDrawingSketch">
        <div ref={this.props.refLoc}></div>
      </div>
    );
  }
}

export default GridDrawing;
