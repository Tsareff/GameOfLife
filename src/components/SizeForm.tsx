import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { SizeObject } from "../types";
import { getSizeObject } from "../utils";
import { SIZE_OPTIONS } from "../constants";

type Props = {
  submitSize: (object: SizeObject) => void;
  restoreGame: () => void;
};

export const SizeForm: React.FC<Props> = ({ submitSize, restoreGame }) => {
  //@ts-ignore
  const savedGame = Boolean(JSON.parse(localStorage.getItem("curState")));
  const [selectValue, setSelectValue] = useState(SIZE_OPTIONS[0]);

  const submitSizeHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitSize(getSizeObject(selectValue));
  };

  return (
    <div className="size-form">
      <form onSubmit={submitSizeHandler}>
        <select
          value={selectValue}
          id="size-choose"
          name="selectSize"
          onChange={e => setSelectValue(e.target.value)}
        >
          {SIZE_OPTIONS.map((option, i) => (
            <option key={i}>{option}</option>
          ))}
        </select>
        <button type="submit">Play</button>
      </form>

      <Button
        className={savedGame ? "" : "disabled"}
        type="submit"
        onClick={restoreGame}
      >
        Load game
      </Button>
    </div>
  );
};
