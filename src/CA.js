import React, { Component } from 'react';
import p5 from 'p5';
import { render } from '@testing-library/react';

let playButton;
let grid;
let cols;
let rows;
let framerate = 5;
let width = 800;
let height = 400;
let resolution = 5;
let playing = false;

class CellularAutomaton extends Component {
  componentDidMount() {
    this.sketch = new p5((p) => {
      p.setup = () => {
        p.createCanvas(width, height).parent(this.props.refLoc.current);
        cols = Math.floor(width / resolution);
        rows = Math.floor(height / resolution);

        p.frameRate(framerate);

        playButton = p.createButton('Play');
        playButton.mousePressed(togglePlay);
        playButton.position();

        grid = this.make2DArray(cols, rows);

        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            grid[i][j] = Math.floor(Math.random() * Math.floor(2));
          }
        }

        p.noLoop();
      };

      function togglePlay() {
        if (playing) {
          p.noLoop();
          playButton.html('Play');
        } else {
          p.loop();
          playButton.html('Pause');
        }
        playing = !playing;
      }

      p.draw = () => {
        p.background(0);

        // console.log(grid);
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
            if (grid[i][j] === 1) {
              p.fill(255);
              //   console.log('getting here');
              p.stroke(0);
              p.rect(x, y, resolution - 1, resolution - 1);
            }
          }
        }

        let next = this.make2DArray(cols, rows);

        // Compute next based on grid
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            let state = grid[i][j];
            // Count live neighbors!
            // let sum = 0;
            let neighbors = this.countNeighbors(grid, i, j);

            if (state === 0 && neighbors === 3) {
              next[i][j] = 1;
            } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
              next[i][j] = 0;
            } else {
              next[i][j] = state;
            }
          }
        }

        grid = next;
      };
    });
  }

  make2DArray = (cols, rows) => {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(rows);
    }
    return arr;
  };

  countNeighbors = (grid, x, y) => {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        let col = (x + i + cols) % cols;
        let row = (y + j + rows) % rows;
        sum += grid[col][row];
      }
    }
    sum -= grid[x][y];
    return sum;
  };

  render() {
    return (
      <div className="CellularAutomaton">
        <div ref={this.props.refLoc}></div>
      </div>
    );
  }
}

export default CellularAutomaton;
