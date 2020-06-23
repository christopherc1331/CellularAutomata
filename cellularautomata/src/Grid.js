import React, { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";
import produce from "immer";

const Grid = () => {
  const [running, setRunning] = useState(false);
  const [numCols, setNumCols] = useState(50);
  const [numRows, setNumRows] = useState(50);
  const [grid, setGrid] = useState(() => {
    const rows = [];

    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  });

  const [operations, setOperations] = useState([
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
  ]);

  const runningRef = useRef();

  runningRef.current = running;

  const runSimulator = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let m = 0; m < numCols; m++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newM = m + y;
              if (newI >= 0 && newI < numRows && newM >= 0 && newM < numCols) {
                neighbors += g[newI][newM];
              }
            });
            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][m] = 0;
            } else if (g[i][m] === 0 && neighbors === 3) {
              gridCopy[i][m] = 1;
            }
          }
        }
      });
    });

    setTimeout(runSimulator, 100);
  }, []);

  return (
    <React.Fragment>
      <button
        onClick={() => {
          setRunning(!running);
          if (!running) {
            runningRef.current = true;
            runSimulator();
          }
        }}
      >
        {running ? "stop" : "start"}
      </button>
      <GridDiv numCols={numCols}>
        {grid.map((rows, i) =>
          rows.map((col, m) => (
            <GridCell
              key={`${i}-${m}`}
              onClick={() => {
                let newGrid = produce(grid, (gridCopy) => {
                  gridCopy[i][m] = grid[i][m] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
              numCols={numCols}
              bkgColor={grid[i][m]}
            />
          ))
        )}
      </GridDiv>
    </React.Fragment>
  );
};

export default Grid;

const GridCell = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${(props) => (props.bkgColor ? "purple" : undefined)};
  border: solid 1px black;
`;

const GridDiv = styled.div`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.numCols},20px)`};
`;
