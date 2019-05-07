import React, { useEffect } from "react";
import { SelectBox, GridMatrix } from "../types";
import { Box } from "./Box";
import { generateBoxes } from "../utils";

type Props = {
  gridMatrix: GridMatrix;
  selectBox: SelectBox;
  seed: () => void;
};

const BOX_WIDTH = 14;

export const Grid: React.FC<Props> = ({ gridMatrix, selectBox, seed }) => {
  useEffect(() => {
    seed();
  }, [seed]);

  const width = gridMatrix[0].length * BOX_WIDTH;

  return (
    <div className="grid" style={{ width }}>
      {generateBoxes(gridMatrix).map((boxData, i) => (
        <Box {...boxData} selectBox={selectBox} key={i} />
      ))}
    </div>
  );
};
