import React, { Component } from 'react';
import p5 from 'p5';

let playButton;
let grid = [
  [0, 1, 1, 0],
  [0, 1, 0, 1],
  [1, 0, 0, 1],
];
let cols = 4;
let rows = 3;
let framerate = 1;
let resolution = 20;
let playing = false;
// let cols;
// let grid;
// let rows;

class CellularAutomaton extends Component {
  componentDidMount() {
    this.sketch = new p5((p) => {
      p.setup = () => {
        let width = cols * resolution;
        let height = rows * resolution;

        p.createCanvas(width, height).parent(this.props.refLoc.current);

        p.frameRate(framerate);

        playButton = p.createButton('Play');
        playButton.mousePressed(togglePlay);
        playButton.position();

        if (!(Array.isArray(grid) && grid.length)) {
          grid = this.createGrid(cols, rows);

          for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
              grid[i][j] = Math.floor(Math.random() * Math.floor(2));
            }
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
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            let x = j * resolution;
            let y = i * resolution;
            if (grid[i][j] === 1) {
              p.fill(255);
              p.stroke(0);
              p.rect(x, y, resolution - 1, resolution - 1);
            }
          }
        }

        let next = this.createGrid(cols, rows);

        // Compute next based on grid
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
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

  createGrid = (cols, rows) => {
    let grid = new Array(rows);
    for (let i = 0; i < grid.length; i++) {
      grid[i] = new Array(cols);
    }
    return grid;
  };

  countNeighbors = (g, r, c) => {
    let sum = 0;
    for (let i = r - 1; i < r + 2; i++) {
      for (let j = c - 1; j < c + 2; j++) {
        if (i >= 0 && i < rows && j >= 0 && j < cols) {
          sum += g[i][j];
        }
      }
    }
    sum -= g[r][c];
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
