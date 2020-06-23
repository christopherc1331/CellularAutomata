import React from "react";
import styled from "styled-components";

const CELL_SIZE = 20;

const WIDTH = 800;

const HEIGHT = 600;

export const Game = () => {
  return (
    <div className="Game">
      <Board CELL_SIZE={CELL_SIZE} WIDTH={WIDTH} HEIGHT={HEIGHT} />
    </div>
  );
};

const Board = styled.div`
  position: "relative";
  margin: "0 auto";
  width: ${(props) => `${props.WIDTH}px`};
  height: ${(props) => `${props.HEIGHT}px`};
  background-color: "#000";
  background-image: linear-gradient(#333 1px, transparent 1px),
    linear-gradient(90deg, #333 1px, transparent 1px);
  background-size: ${(props) => `${props.CELL_SIZE}px ${props.CELL_SIZE}px`};
`;
