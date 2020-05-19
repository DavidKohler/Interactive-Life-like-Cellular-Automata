/*
    File for all functions dealing with grid logic
*/

function createGrid(r, c, aliveP) {
  // create grid with random cells
  let grid = new Array(r);
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(c);
  }
  // modify probability based on specified percentage alive
  let modifiedProbRandom = Array(100).fill(1).fill(0, aliveP);
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      grid[i][j] = modifiedProbRandom[Math.floor(Math.random() * 100)];
    }
  }
  return grid;
}

function reshapeGrid(oldGrid, newR, newC) {
  // reshape cells to grid if grid needs to be resized
  let newGrid = oldGrid.map((inner) => inner.slice());
  let extraRows = newR - oldGrid.length;
  let extraCols = newC - oldGrid[0].length;
  if (extraRows >= 0) {
    for (let i = 0; i < Math.floor(extraRows / 2); i++) {
      newGrid.push(Array(oldGrid[0].length).fill(0));
      newGrid.unshift(Array(oldGrid[0].length).fill(0));
    }
    if (extraRows % 2 === 1) {
      newGrid.push(Array(oldGrid[0].length).fill(0));
    }
  }
  if (extraRows < 0) {
    extraRows = Math.abs(extraRows);
    for (let i = 0; i < Math.floor(extraRows / 2); i++) {
      newGrid.pop();
      newGrid.shift();
    }
    if (extraRows % 2 === 1) {
      newGrid.pop();
    }
  }
  if (extraCols >= 0) {
    for (let j = 0; j < Math.floor(extraCols / 2); j++) {
      for (let k = 0; k < newGrid.length; k++) {
        newGrid[k].push(0);
        newGrid[k].unshift(0);
      }
    }
    if (extraCols % 2 === 1) {
      for (let k = 0; k < newGrid.length; k++) {
        newGrid[k].push(0);
      }
    }
  }
  if (extraCols < 0) {
    extraCols = Math.abs(extraCols);
    for (let j = 0; j < Math.floor(extraCols / 2); j++) {
      for (let k = 0; k < newGrid.length; k++) {
        newGrid[k].pop();
        newGrid[k].shift();
      }
    }
    if (extraCols % 2 === 1) {
      for (let k = 0; k < newGrid.length; k++) {
        newGrid[k].pop();
      }
    }
  }

  return newGrid;
}

function tableToGrid(table) {
  // converts table elements to 2D grid notation
  let rows = table.childNodes;
  let rowCount = rows.length;
  let colsCount = rows[0].childNodes.length;
  let grid = new Array(rowCount);
  for (let i = 0; i < rowCount; i++) {
    grid[i] = new Array(colsCount).fill(0);
    let cols = rows[i].childNodes;
    for (let j = 0; j < colsCount; j++) {
      if (cols[j].className === 'clicked') {
        grid[i][j] = 1;
      }
    }
  }
  return grid;
}

export { createGrid, reshapeGrid, tableToGrid };
