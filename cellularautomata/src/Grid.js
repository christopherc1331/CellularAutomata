import React, { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";
import produce from "immer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const Grid = () => {
  const makeEmptyGrid = () => {
    const rows = [];

    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  };

  const [running, setRunning] = useState(false);
  const [numCols, setNumCols] = useState(50);
  const [numRows, setNumRows] = useState(50);
  const [evols, setEvols] = useState(1000);
  const [displayedEvols, setDisplayedEvols] = useState(
    Math.round((1000 / evols + Number.EPSILON) * 100) / 100
  );
  const [inputValue, setInputValue] = useState(displayedEvols);
  const [editMode, setEditMode] = useState(false);
  const [grid, setGrid] = useState(() => {
    return makeEmptyGrid();
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

    setTimeout(runSimulator, evols);
  }, [evols]);

  useEffect(() => {
    setEvols(Math.round(1000 / displayedEvols));
  }, [inputValue]);

  return (
    <Container>
      <h1>Conway's Game of Life: Cellular Automata</h1>
      <ButtonContainer>
        <button
          onClick={() => {
            setRunning(!running);
            if (!running) {
              runningRef.current = true;
              runSimulator();
            }
          }}
        >
          {running ? "Stop" : "Start"}
        </button>
        <button onClick={() => setGrid(makeEmptyGrid())}>Clear</button>
        <button
          onClick={() => {
            const rows = [];

            for (let i = 0; i < numRows; i++) {
              rows.push(
                Array.from(Array(numCols), () => (Math.random() > 0.5 ? 1 : 0))
              );
            }
            setGrid(rows);
          }}
        >
          Random
        </button>
        <RevolsContainer>
          {editMode ? (
            <input
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setDisplayedEvols(e.target.value);
              }}
            />
          ) : (
            <p
              style={{ fontWeight: "bold" }}
            >{`Speed: ${displayedEvols} evolution${
              displayedEvols != 1 ? "s" : ""
            }/sec`}</p>
          )}
          <FontAwesomeIcon
            onClick={() => {
              setEditMode(!editMode);
            }}
            icon={faEdit}
          />
        </RevolsContainer>
      </ButtonContainer>
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
    </Container>
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

const ButtonContainer = styled.div`
  width: 60%;
  height: 40px;
  display: flex;
  justify-content: space-around;
  margin: 10px 0;
  button {
    width: 80px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RevolsContainer = styled.div`
  width: 300px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
