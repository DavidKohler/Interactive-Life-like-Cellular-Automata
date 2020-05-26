import React, { Component } from 'react';
import p5 from 'p5';

/*
    Component to render p5 sketch of cellular automaton based on props passed in
*/

class CellularAutomatonSketch extends Component {
  componentDidMount() {
    let {
      backgroundColor,
      birthRule,
      cellColor,
      cellSize,
      cols,
      framerate,
      grid,
      parentTab,
      rows,
      surviveRule,
    } = this.props;

    let playButton;
    let playing = false;
    let nextButton;

    // create sketch
    this.sketch = new p5((p) => {
      p.setup = () => {
        // setup sketch and buttons
        let width = cols * cellSize;
        let height = rows * cellSize;

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

        if (parentTab === 'LOAD') {
          playButton.parent('playbutton');
        } else {
          playButton.parent('playbuttonRandom');
        }

        nextButton = p.createButton('Next');
        nextButton.mousePressed(toggleNext);
        nextButton.style('color', '#fff');
        nextButton.style('background-color', '#007bff');
        nextButton.style('border-color', '#007bff');
        nextButton.style('font-weight', '400');
        nextButton.style('border', '1px solid transparent');
        nextButton.style('padding', '.375rem .75rem');
        nextButton.style('font-size', '1rem');
        nextButton.style('line-height', '1.5');
        nextButton.style('border-radius', '.25rem');

        if (parentTab === 'LOAD') {
          nextButton.parent('nextbutton');
        } else {
          nextButton.parent('nextbuttonRandom');
        }

        p.noLoop();
      };

      p.draw = () => {
        // draw cells and grid
        p.background(backgroundColor);

        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            let x = j * cellSize;
            let y = i * cellSize;
            if (grid[i][j] === 1) {
              p.fill(cellColor);
              p.stroke(backgroundColor);
              p.rect(x, y, cellSize - 1, cellSize - 1);
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

      function toggleNext() {
        // control next button
        p.draw();
      }

      function togglePlay() {
        // control play button
        if (playing) {
          p.noLoop();
          playButton.html('Play');
        } else {
          p.loop();
          playButton.html('Pause');
        }
        playing = !playing;
      }
    });
  }

  countNeighbors = (g, r, c, maxR, maxC) => {
    // find number of neighbors from cell at g[r][c]
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
    // create new grid of size r*c
    let g = new Array(r);
    for (let i = 0; i < g.length; i++) {
      g[i] = new Array(c);
    }
    return g;
  };

  render() {
    // render to parent component
    return (
      <div className="CellularAutomatonSketch">
        <div ref={this.props.refLoc} />
      </div>
    );
  }
}

export default CellularAutomatonSketch;
