import React, { Component } from 'react';
import p5 from 'p5';

class CellularAutomaton extends Component {
  componentDidMount() {
    const { cols, rows, framerate, resolution } = this.props;
    let { grid } = this.props;
    let playButton;
    let playing = false;

    this.sketch = new p5((p) => {
      p.setup = () => {
        let width = cols * resolution;
        let height = rows * resolution;

        p.createCanvas(width, height).parent(this.props.refLoc.current);

        p.frameRate(framerate);

        playButton = p.createButton('Play');
        playButton.mousePressed(togglePlay);
        playButton.position();

        // if (!(Array.isArray(grid) && grid.length)) {
        //   grid = this.createGrid(cols, rows);

        //   for (let i = 0; i < rows; i++) {
        //     for (let j = 0; j < cols; j++) {
        //       grid[i][j] = Math.floor(Math.random() * Math.floor(2));
        //     }
        //   }
        // }

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

        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            let state = grid[i][j];
            let neighbors = this.countNeighbors(grid, i, j, rows, cols);

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

  countNeighbors = (g, r, c, maxR, maxC) => {
    let sum = 0;
    for (let i = r - 1; i < r + 2; i++) {
      for (let j = c - 1; j < c + 2; j++) {
        if (i >= 0 && i < maxR && j >= 0 && j < maxC) {
          sum += g[i][j];
        }
      }
    }
    sum -= g[r][c];
    return sum;
  };

  createGrid = (rows, cols) => {
    let grid = new Array(rows);
    for (let i = 0; i < grid.length; i++) {
      grid[i] = new Array(cols);
    }
    return grid;
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
