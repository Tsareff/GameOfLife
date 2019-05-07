import React from "react";
import { SelectBox } from "../types";

type Props = {
  boxId: string;
  className: string;
  row: number;
  col: number;
  selectBox: SelectBox;
};

export const Box: React.FC<Props> = ({
  className,
  boxId,
  row,
  col,
  selectBox,
}) => {
  const selectBoxHandler = () => {
    selectBox(row, col);
  };

  return <div className={className} id={boxId} onClick={selectBoxHandler} />;
};
