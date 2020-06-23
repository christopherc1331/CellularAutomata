import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Grid = () => {
  const [numCols, setNumCols] = useState(50);
  const [numRows, setNumRows] = useState(50);
  const [grid, setGrid] = useState(() => {
    const rows = [];

    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  });

  console.log(grid);

  return (
    <GridDiv numCols={numCols}>
      {grid.map((rows, i) =>
        rows.map((col, m) => (
          <GridCell key={`${i}-${m}`} numCols={numCols} bkgColor={grid[i][m]} />
        ))
      )}
    </GridDiv>
  );
};

export default Grid;

const GridCell = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${(props) => (props.bkgColor ? "yellow" : undefined)};
  border: solid 1px black;
`;

const GridDiv = styled.div`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.numCols},20px)`};
`;
