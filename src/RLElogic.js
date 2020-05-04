export default function gridToRLE(grid, bRule, sRule) {
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

  return {
    top,
    bot,
    minCol,
    maxCol,
  };
}

function cellCounter(cells) {
  let s = cells.match(/([a-zA-Z])\1*/g) || [];
  return s.map((v) => {
    return [v.charAt(0), v.length];
  });
}

function encodeGrid(grid, top, bot, minCol, maxCol) {
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
