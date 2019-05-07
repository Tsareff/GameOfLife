import { BoxData, GridMatrix } from "./types";

export const arrayClone = (arr: Array<any>) => {
  return JSON.parse(JSON.stringify(arr));
};

export const generateBoxes: (
  gridMatrix: GridMatrix,
) => BoxData[] = gridMatrix => {
  const boxesDataArray: BoxData[] = [];

  gridMatrix.forEach((row, i) => {
    row.forEach((col, j) => {
      boxesDataArray.push({
        className: col ? "box on" : "box off",
        row: i,
        col: j,
        boxId: i + "_" + j,
      });
    });
  });

  return boxesDataArray;
};

export const getSizeObject = (value: string) => {
  const splittedValue = value.split("x");
  return {
    rows: parseInt(splittedValue[0]),
    cols: parseInt(splittedValue[1]),
  };
};

export const fillEmptyGridMatrix = (rows: number, cols: number) =>
  Array(rows)
    .fill(false)
    .map(() => {
      return Array(cols).fill(false);
    });
