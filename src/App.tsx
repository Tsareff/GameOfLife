import React from "react";
import { Grid } from "./components/Grid";
import { Buttons } from "./components/Buttons";
import { SizeForm } from "./components/SizeForm";
import { SizeObject, GridMatrix } from "./types";
import { arrayClone, fillEmptyGridMatrix } from "./utils";

export const STORAGE_STATE = "savedGame";

type State = {
  generation: number;
  formSubmitted: boolean;
  gridMatrix: GridMatrix;
};

export class App extends React.Component<{}, State> {
  speed = 100;
  rows = 30;
  cols = 50;
  intervalId = 0;

  state = {
    generation: 0,
    formSubmitted: false,
    gridMatrix: fillEmptyGridMatrix(this.rows, this.cols),
  };

  selectBox = (row: number, col: number) => {
    let gridCopy = arrayClone(this.state.gridMatrix);

    gridCopy[row][col] = !gridCopy[row][col];

    this.setState({
      gridMatrix: gridCopy,
    });
  };

  seed = () => {
    if (!localStorage.getItem(STORAGE_STATE)) {
      let gridCopy: GridMatrix = arrayClone(this.state.gridMatrix);

      gridCopy.forEach((row, i) => {
        row.forEach((col, j) => {
          if (Math.floor(Math.random() * 4) === 1) {
            row[j] = true;
          }
        });
      });

      this.setState({
        gridMatrix: gridCopy,
      });
    }
  };

  playButton = () => {
    clearInterval(this.intervalId);
    this.intervalId = window.setInterval(this.play, this.speed);
  };

  pauseButton = () => {
    clearInterval(this.intervalId);
  };

  slow = () => {
    this.speed = 1000;
    this.playButton();
  };

  fast = () => {
    this.speed = 100;
    this.playButton();
  };

  clear = () => {
    const emptyGridMatrix = fillEmptyGridMatrix(this.rows, this.cols);

    this.setState({
      generation: 0,
      formSubmitted: true,
      gridMatrix: emptyGridMatrix,
    });
  };

  gridSize: (sizeObj: SizeObject) => void = ({ rows, cols }) => {
    this.cols = cols;
    this.rows = rows;

    this.clear();
  };

  submitSize: (sizeObject: SizeObject) => void = ({ rows, cols }) => {
    this.rows = rows;
    this.cols = cols;

    let newGrid = fillEmptyGridMatrix(rows, cols);

    const newState = {
      gridMatrix: newGrid,
      formSubmitted: !this.state.formSubmitted,
    };

    this.setState({
      ...newState,
    });
  };

  restoreGame = () => {
    const storageState = localStorage.getItem(STORAGE_STATE);

    const parsedStorageState = storageState && JSON.parse(storageState);

    if (parsedStorageState) {
      this.setState({
        ...parsedStorageState,
        formSubmitted: !this.state.formSubmitted,
      });
      this.rows = parsedStorageState.rows;
      this.cols = parsedStorageState.cols;
    }
  };

  play = () => {
    let g = this.state.gridMatrix;
    let g2 = arrayClone(this.state.gridMatrix);

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let count = 0;
        if (i > 0) if (g[i - 1][j]) count++;
        if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
        if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
        if (j < this.cols - 1) if (g[i][j + 1]) count++;
        if (j > 0) if (g[i][j - 1]) count++;
        if (i < this.rows - 1) if (g[i + 1][j]) count++;
        if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
        if (i < this.rows - 1 && j < this.cols - 1)
          if (g[i + 1][j + 1]) count++;
        if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
        if (!g[i][j] && count === 3) g2[i][j] = true;
      }
    }

    const curGen = {
      gridMatrix: g2,
      generation: this.state.generation + 1,
    };

    this.setState({ ...curGen });
  };

  render() {
    let forReturn = this.state.formSubmitted ? (
      <div>
        <h1>The Game of Life</h1>
        <Buttons
          play={this.playButton}
          pause={this.pauseButton}
          slow={this.slow}
          fast={this.fast}
          clear={this.clear}
          seed={this.seed}
          changeGridSize={this.gridSize}
        />
        <Grid
          gridMatrix={this.state.gridMatrix}
          selectBox={this.selectBox}
          seed={this.seed}
          generation={this.state.generation}
        />
        <h2>Generations: {this.state.generation}</h2>
      </div>
    ) : (
      <SizeForm submitSize={this.submitSize} restoreGame={this.restoreGame} />
    );
    return forReturn;
  }
}
