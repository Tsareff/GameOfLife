import React from "react";
import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
import { SizeObject } from "../types";
import { getSizeObject } from "../utils";
import { SIZE_OPTIONS } from "../constants";

type Props = {
  changeGridSize: (sizeObj: SizeObject) => void;
  play: () => void;
  pause: () => void;
  clear: () => void;
  slow: () => void;
  fast: () => void;
  seed: () => void;
};

export const Buttons: React.FC<Props> = ({
  changeGridSize,
  play,
  pause,
  clear,
  slow,
  fast,
  seed,
}) => {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    changeGridSize(getSizeObject(event.target.value));
  };

  return (
    <div className="center">
      <ButtonToolbar>
        <button className="btn btn-default" onClick={play}>
          Play
        </button>
        <button className="btn btn-default" onClick={pause}>
          Pause
        </button>
        <button className="btn btn-default" onClick={clear}>
          Clear
        </button>
        <button className="btn btn-default" onClick={slow}>
          Slow
        </button>
        <button className="btn btn-default" onClick={fast}>
          Fast
        </button>
        <button className="btn btn-default" onClick={seed}>
          Seed
        </button>
        <select id="size-menu" onChange={handleSelect}>
          {SIZE_OPTIONS.map((option, i) => (
            <option key={i}>{option}</option>
          ))}
        </select>
      </ButtonToolbar>
    </div>
  );
};
