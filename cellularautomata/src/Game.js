import React, { useState } from "react";
import styled from "styled-components";

const cell_size = 20;
const width = 800;
const height = 700;

export const Game = () => {
  const [rows, setRows] = useState(height / cell_size);
  const [cols, setCols] = useState(width / cell_size);
  const [cells, setCells] = useState([]);
  const [board, setBoard] = useState([]);

  const makeEmptyBoard = () => {
    for (let y = 0; y < rows; y++) {
      board[y] = [];

      for (let p = 0; p < cols; p++) {
        board[y][p] = false;
      }
    }
    return board;
  };

  const makeCells = () => {
    for (let y = 0; y < rows; y++) {
      for (let p = 0; p < cols; p++) {
        if (board[y][p]) {
          cells.push({ p, y });
        }
      }
    }

    return cells;
  };

  return (
    <div className="Game">
      <Board cell_size={cell_size} width={width} height={height} />
    </div>
  );
};

const Board = styled.div`
  position: "relative";
  margin: "0 auto";
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
  background-color: "#000";
  background-image: linear-gradient(#333 1px, transparent 1px),
    linear-gradient(90deg, #333 1px, transparent 1px);
  background-size: ${(props) => `${props.cell_size}px ${props.cell_size}px`};
`;
