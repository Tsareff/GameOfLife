export type SelectBox = (row: number, col: number) => void;

export type SizeObject = {
  rows: number;
  cols: number;
};

export type GridMatrix = Array<Array<boolean>>;

export type BoxData = {
  className: string;
  row: number;
  col: number;
  boxId: string;
};
