import React, { useEffect } from "react";
import { SelectBox, GridMatrix } from "../types";
import { Box } from "./Box";
import { generateBoxes } from "../utils";
import { STORAGE_STATE } from "../App";

type Props = {
  gridMatrix: GridMatrix;
  selectBox: SelectBox;
  generation: number;
  seed: () => void;
};

const BOX_WIDTH = 14;

export const Grid: React.FC<Props> = ({
  gridMatrix,
  selectBox,
  seed,
  generation,
}) => {
  useEffect(() => {
    seed();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_STATE,
      JSON.stringify({
        gridMatrix,
        generation,
        rows: gridMatrix.length,
        cols: gridMatrix[0].length,
      }),
    );
  }, [generation, gridMatrix]);

  const width = gridMatrix[0].length * BOX_WIDTH;

  return (
    <div className="grid" style={{ width }}>
      {generateBoxes(gridMatrix).map((boxData, i) => (
        <Box {...boxData} selectBox={selectBox} key={i} />
      ))}
    </div>
  );
};
