import { uniq } from 'lodash';

/*
    File for all functions dealing with RLE logic
*/

function gridToRLE(grid, bRule, sRule) {
  // convert grid with B rule and S rule to RLE array
  // where each element in array is a separate line of RLE file
  let { top, bot, minCol, maxCol } = findMeaningfulBoundaries(grid);
  let RLEarray = [];
  RLEarray.push(
    `x = ${maxCol - minCol + 1}, y = ${bot - top + 1}, rule = B${bRule
      .map(String)
      .join('')}/S${sRule.map(String).join('')}`
  );
  let RLEgroups = encodeGrid(grid, top, bot, minCol, maxCol);
  let finishedWriting = false;
  let pos = 0;
  let individualLine = '';
  while (finishedWriting === false) {
    if (RLEgroups[pos][1] === 1) {
      // single cell
      if (1 + individualLine.length > 70) {
        // new line
        RLEarray.push(individualLine);
        individualLine = RLEgroups[pos][0];
      } else {
        // same line
        individualLine = individualLine.concat(RLEgroups[pos][0]);
      }
    } else {
      if (
        RLEgroups[pos][1].toString().length + (individualLine.length + 1) >
        70
      ) {
        // new line
        RLEarray.push(individualLine);
        individualLine = RLEgroups[pos][1].toString().concat(RLEgroups[pos][0]);
      } else {
        // same line
        individualLine = individualLine.concat(
          RLEgroups[pos][1].toString().concat(RLEgroups[pos][0])
        );
      }
    }
    if (pos === RLEgroups.length - 1) {
      RLEarray.push(individualLine);
      finishedWriting = true;
    } else {
      pos++;
    }
  }

  return RLEarray;
}

function findMeaningfulBoundaries(grid) {
  // given grid, find smallest boundaries that contain all
  // specified cells, which is needed for RLE file
  let rowSums = grid.map((row) => {
    return row.reduce((a, b) => {
      return a + b;
    });
  });
  let sumCol = (r, a) => r.map((b, i) => a[i] + b);
  let colSums = grid.reduce(sumCol);

  let top = rowSums.findIndex((v) => v > 0);
  let bot =
    rowSums.length -
    1 -
    rowSums
      .slice()
      .reverse()
      .findIndex((v) => v > 0);

  let minCol = colSums.findIndex((v) => v > 0);
  let maxCol =
    colSums.length -
    1 -
    colSums
      .slice()
      .reverse()
      .findIndex((v) => v > 0);

  if (top === -1 || bot === -1) {
    // empty grid found, no meaningful boundary possible
    // return default grid dimensions
    top = 0;
    bot = grid.length - 1;
    minCol = 0;
    maxCol = grid[0].length - 1;
  }

  return {
    top,
    bot,
    minCol,
    maxCol,
  };
}

function cellCounter(cells) {
  // convert strings of cells to value length format
  // ex: bb -> ['b', 2]
  let s = cells.match(/([a-zA-Z])\1*/g) || [];
  return s.map((v) => {
    return [v.charAt(0), v.length];
  });
}

function encodeGrid(grid, top, bot, minCol, maxCol) {
  // encode a grid from 2D array of 0's and 1's to
  // unsimplified RLE string format
  // ex: 0 1 1 -> boo
  let RLEgroups = [];
  for (let row = top; row < bot + 1; row++) {
    let rowString = '';
    for (let col = minCol; col < maxCol + 1; col++) {
      let cell = grid[row][col];
      if (cell === 1) {
        rowString = rowString.concat('o');
      } else {
        rowString = rowString.concat('b');
      }
    }
    let group = cellCounter(rowString);
    group.forEach((g) => {
      RLEgroups.push(g);
    });
    if (row !== bot) {
      RLEgroups.push(['$', 1]);
    } else {
      RLEgroups.push(['!', 1]);
    }
  }

  // optimize RLE string by considering neighbors in string
  let possibleOptimization = true;
  while (possibleOptimization === true) {
    possibleOptimization = false;
    let indicesToRemove = [];
    for (let i = 0; i < RLEgroups.length; i++) {
      if (i < RLEgroups.length - 1) {
        if (
          ['$', '!'].includes(RLEgroups[i + 1][0]) &&
          RLEgroups[i][0] === 'b'
        ) {
          indicesToRemove.push(i);
        }
        if (RLEgroups[i][0] === RLEgroups[i + 1][0]) {
          RLEgroups[i + 1] = [
            RLEgroups[i][0],
            RLEgroups[i][1] + RLEgroups[i + 1][1],
          ];
          indicesToRemove.push(i);
        }
      }
    }

    // remove specified indices from array
    if (indicesToRemove.length > 0) {
      possibleOptimization = true;
      // delete indices
      indicesToRemove.sort(function (a, b) {
        return a - b;
      });
      while (indicesToRemove.length) {
        RLEgroups.splice(indicesToRemove.pop(), 1);
      }
    }
  }
  return RLEgroups;
}

function RLEtoGrid(RLEstring) {
  // given and RLE file (string), convert to 2d array for grid
  let RLElines = RLEstring.toLowerCase().split('\n');
  let gridString = '';
  let xvalue, yvalue, rulestring;
  for (let i = 0; i < RLElines.length; i++) {
    if (RLElines[i][0] === '#') {
      // comment line
      continue;
    } else if (RLElines[i][0] === 'x') {
      // rule line
      let chunks = RLElines[i].split(',');
      xvalue = Number(chunks[0].trim().split('=')[1]);
      yvalue = Number(chunks[1].trim().split('=')[1]);
      rulestring = chunks[2].split('=')[1].trim();
    } else {
      gridString = gridString.concat(RLElines[i]);
    }
    if (RLElines[i][RLElines[i].length - 1] === '!') {
      gridString = gridString.slice(0, -1);
    }
  }
  if (!(xvalue > 0) || !(yvalue > 0)) {
    // x or y not valid/not specified
    throw new Error('Dimension Error');
  }
  let grid = [];
  let rowChunks = gridString.split('$');
  for (let j = 0; j < rowChunks.length; j++) {
    let re = /[bo]/g;
    // only match b's and o's
    let RLEtags = [];
    let match = null;
    let tagCounts = rowChunks[j].split(/[bo]/);
    do {
      match = re.exec(rowChunks[j]);
      if (match) {
        RLEtags.push(match[0]);
      }
    } while (match);
    let gridRow = [];
    for (let k = 0; k < RLEtags.length; k++) {
      let curTag = RLEtags[k];
      let curCt = Number(tagCounts[k]);
      if (curCt === 0) {
        curCt = 1;
      }
      if (curTag === 'b') {
        gridRow.push(...Array(curCt).fill(0));
      } else {
        gridRow.push(...Array(curCt).fill(1));
      }
    }
    if (gridRow.length < xvalue) {
      // add extra 0's
      gridRow.push(...Array(xvalue - gridRow.length).fill(0));
    }
    if (gridRow.length > xvalue) {
      // prune RLE based on provided xvalue
      let gridRowLen = gridRow.length;
      for (let p = 0; p < gridRowLen - xvalue; p++) {
        gridRow.pop();
      }
    }
    grid.push(gridRow);
    if (tagCounts[tagCounts.length - 1] !== '') {
      // account for gap lines
      for (let z = 0; z < Number(tagCounts[tagCounts.length - 1]) - 1; z++) {
        grid.push(Array(xvalue).fill(0));
      }
    }
  }

  if (grid.length < yvalue) {
    // handle discrepency when RLE provided doesn't match yvalue provided
    let len = grid.length;
    for (let p = 0; p < yvalue - len; p++) {
      grid.push(Array(xvalue).fill(0));
    }
  }

  // check for valid birth and survive rules, otherwise default to empty rules
  let birthRule, surviveRule;
  try {
    birthRule = uniq(
      rulestring
        .split('/')[0]
        .split('b')[1]
        .split('')
        .map((e) => Number(e))
        .filter((e) => e >= 0)
    );
  } catch (err) {
    // no birth rule specified
    birthRule = [];
  }
  try {
    surviveRule = uniq(
      rulestring
        .split('/')[1]
        .split('s')[1]
        .split('')
        .map((e) => Number(e))
        .filter((e) => e >= 0)
    );
  } catch (err) {
    // no survive rule specified
    surviveRule = [];
  }

  return { grid, birthRule, surviveRule, rows: yvalue, cols: xvalue };
}

export { gridToRLE, RLEtoGrid };
