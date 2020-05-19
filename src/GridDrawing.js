import React, { Component } from 'react';
import p5 from 'p5';
import './GridDrawing.css';

let numberOfRows; //determine the number of rows we want
let numberOfColumns; //determine the number of columns we want

let xStep; //determine the size of the gap between two points on the x axis
let yStep; //determine the size of the gap between two points on the y axis

let positions = []; //an array of positions where we will store each of our Vectors
let width = 400;
let height = 400;

let lastClicked;

class GridDrawing extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
    };
  }

  componentDidMount() {
    this.setState({ oobo: 0 });
  }

  componentDidUpdate() {
    let boobo = this.state.oobo + 1;
    if (boobo === 1) {
      let grid = this.clickableGrid(10, 10, function (el, row, col, i) {
        console.log('You clicked on element:', el);
        console.log('You clicked on row:', row);
        console.log('You clicked on col:', col);
        console.log('You clicked on item #:', i);

        el.className = 'clicked';
        /* if (lastClicked) lastClicked.className='';
            lastClicked = el; */
      });
      this.setState({ oobo: 2 });

      document.body.appendChild(grid);
    }
  }

  clickableGrid = (rows, cols, callback) => {
    var i = 0;
    var grid = document.createElement('table');
    grid.className = 'grid';
    for (var r = 0; r < rows; ++r) {
      var tr = grid.appendChild(document.createElement('tr'));
      for (var c = 0; c < cols; ++c) {
        var cell = tr.appendChild(document.createElement('td'));
        cell.innerHTML = ++i;
        cell.addEventListener(
          'click',
          (function (el, r, c, i) {
            return function () {
              callback(el, r, c, i);
            };
          })(cell, r, c, i),
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
