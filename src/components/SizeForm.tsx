import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { SizeObject } from "../types";
import { getSizeObject } from "../utils";
import { SIZE_OPTIONS } from "../constants";
import { STORAGE_STATE } from "../App";

type Props = {
  submitSize: (object: SizeObject) => void;
  restoreGame: () => void;
};

export const SizeForm: React.FC<Props> = ({ submitSize, restoreGame }) => {
  const storageData = localStorage.getItem(STORAGE_STATE);

  const parsedStorageState = Boolean(storageData && JSON.parse(storageData));

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
        className={parsedStorageState ? "" : "disabled"}
        type="submit"
        onClick={restoreGame}
      >
        Load game
      </Button>
    </div>
  );
};
