import React, { Component } from 'react';
import p5 from 'p5';

class CellularAutomatonSketch extends Component {
  componentDidMount() {
    let {
      cols,
      rows,
      framerate,
      resolution,
      birthRule,
      surviveRule,
      backgroundColor,
      cellColor,
    } = this.props;

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
        playButton.style('color', '#fff');
        playButton.style('background-color', '#007bff');
        playButton.style('border-color', '#007bff');
        playButton.style('font-weight', '400');
        playButton.style('border', '1px solid transparent');
        playButton.style('padding', '.375rem .75rem');
        playButton.style('font-size', '1rem');
        playButton.style('line-height', '1.5');
        playButton.style('border-radius', '.25rem');

        playButton.position(50, 50);

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
        p.background(backgroundColor);

        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            let x = j * resolution;
            let y = i * resolution;
            if (grid[i][j] === 1) {
              p.fill(cellColor);
              p.stroke(backgroundColor);
              p.rect(x, y, resolution - 1, resolution - 1);
            }
          }
        }

        let next = this.createGrid(rows, cols);

        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            let thisCell = grid[i][j];
            let nAlive = this.countNeighbors(grid, i, j, rows, cols);

            if (thisCell === 1) {
              // alive cell, check for survival
              if (surviveRule.includes(nAlive)) {
                // lives on
                next[i][j] = 1;
              } else {
                // underpopulation or overpopulation -> dies
                next[i][j] = 0;
              }
            } else {
              // dead cell, check for birth
              if (birthRule.includes(nAlive)) {
                // reproduces
                next[i][j] = 1;
              } else {
                // stays dead
                next[i][j] = 0;
              }
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

  createGrid = (r, c) => {
    let g = new Array(r);
    for (let i = 0; i < g.length; i++) {
      g[i] = new Array(c);
    }
    return g;
  };

  render() {
    return (
      <div className="CellularAutomatonSketch">
        <div ref={this.props.refLoc}></div>
      </div>
    );
  }
}

export default CellularAutomatonSketch;

//TODO
// allow for different rulesets
