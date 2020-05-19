import '../css/InteractiveGrid.css';
import React, { Component } from 'react';

/*
        Component for Interactive Grid
*/

class InteractiveGrid extends Component {
  componentDidMount() {
    // create clickable grid
    let grid = this.clickableGrid(this.props.rows, this.props.cols, function (
      el,
      row,
      col
    ) {
      if (el.className === 'clicked') {
        // make dead
        el.className = '';
      } else {
        // make alive
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
      <div className="InteractiveGridSketch">
        <div ref={this.props.refLoc}></div>
      </div>
    );
  }
}

export default InteractiveGrid;
