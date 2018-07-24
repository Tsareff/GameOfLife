import React from "react";
import ReactDOM from "react-dom";
import {
  ButtonToolbar,
  Button,
  MenuItem,
  DropdownButton,
  FormGroup,
  ControlLabel,
  HelpBlock,
  FormControl
} from "react-bootstrap";
import "./index.css";

class SizeForm extends React.Component {
  sizeChangeHandler = evt => {
    evt.preventDefault();
    const value = evt.currentTarget.value.split("x");
    const rows = value[0];
    const cols = value[1];
    this.size = {
      rows,
      cols
    };
  };

  render() {
    return (
      <div
        className={this.props.formSubmitted ? "size-form hide" : "size-form"}
      >
        <FieldGroup
          id="formControlsText"
          type="text"
          label="Please enter the size of field"
          placeholder="20x10"
          onChange={this.sizeChangeHandler}
        />
        <Button type="submit" onClick={() => this.props.submitSize(this.size)}>
          Submit
        </Button>
      </div>
    );
  }
}

class Box extends React.Component {
  selectBox = () => {
    this.props.selectBox(this.props.row, this.props.col);
  };

  render() {
    return (
      <div
        className={this.props.boxClass}
        id={this.props.boxId}
        onClick={this.selectBox}
      />
    );
  }
}

class Grid extends React.Component {
  render() {
    const width = this.props.cols * 14;
    const rowsArr = [];
    let boxClass = "";
    for (let i = 0; i < this.props.rows; i++) {
      for (let j = 0; j < this.props.cols; j++) {
        let boxId = i + "_" + j;
        boxClass = this.props.gridFull[i][j] ? "box on" : "box off";
        rowsArr.push(
          <Box
            boxClass={boxClass}
            key={boxId}
            boxId={boxId}
            row={i}
            col={j}
            selectBox={this.props.selectBox}
          />
        );
      }
    }
    return (
      <div
        className={this.props.formSubmitted ? "grid" : "grid hide"}
        style={{ width }}
      >
        {rowsArr}
      </div>
    );
  }
}

class Buttons extends React.Component {
  handleSelect = evt => {
    this.props.gridSize(evt);
  };
  render() {
    return (
      <div className={this.props.formSubmitted ? "center" : "center hide"}>
        <ButtonToolbar>
          <button className="btn btn-default" onClick={this.props.playButton}>
            Play
          </button>
          <button className="btn btn-default" onClick={this.props.pauseButton}>
            Pause
          </button>
          <button className="btn btn-default" onClick={this.props.clear}>
            Clear
          </button>
          <button className="btn btn-default" onClick={this.props.slow}>
            Slow
          </button>
          <button className="btn btn-default" onClick={this.props.fast}>
            Fast
          </button>
          <button className="btn btn-default" onClick={this.props.seed}>
            Seed
          </button>
          <DropdownButton
            title="Grid size"
            id="size-menu"
            onSelect={this.handleSelect}
          >
            <MenuItem eventKey="1">20x10</MenuItem>
            <MenuItem eventKey="2">50x30</MenuItem>
            <MenuItem eventKey="3">70x50</MenuItem>
          </DropdownButton>
        </ButtonToolbar>
      </div>
    );
  }
}

class Main extends React.Component {
  constructor() {
    super();
    this.speed = 100;
    this.rows = 30;
    this.cols = 50;
    this.state = {
      generation: 0,
      formSubmitted: false,
      gridFull: Array(this.rows)
        .fill()
        .map(() => {
          return Array(this.cols).fill(false);
        })
    };
  }

  selectBox = (row, col) => {
    let gridCopy = arrayClone(this.state.gridFull);
    gridCopy[row][col] = !gridCopy[row][col];
    this.setState({
      gridFull: gridCopy
    });
  };

  seed = () => {
    let gridCopy = arrayClone(this.state.gridFull);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (Math.floor(Math.random() * 10) === 1) {
          gridCopy[i][j] = true;
        }
      }
    }
    this.setState({
      gridFull: gridCopy
    });
  };

  playButton = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.play, this.speed);
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
    let gridFull = Array(this.rows)
      .fill()
      .map(() => {
        return Array(this.cols).fill(false);
      });
    this.setState({ generation: 0, formSubmitted: true, gridFull });
  };

  gridSize = size => {
    switch (size) {
      case "1":
        this.cols = 20;
        this.rows = 10;
        break;
      case "2":
        this.cols = 50;
        this.rows = 30;
        break;
      default:
        this.cols = 70;
        this.rows = 50;
        break;
    }
    this.clear();
  };

  submitSize = ({ rows, cols }) => {
    this.rows = Number(rows);
    this.cols = Number(cols);
    this.setState({
      formSubmitted: !this.state.formSubmitted
    });
  };

  play = () => {
    let g = this.state.gridFull;
    let g2 = arrayClone(this.state.gridFull);
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
    this.setState({
      gridFull: g2,
      generation: this.state.generation + 1
    });
  };

  componentDidMount() {
    this.seed();
  }

  render() {
    return (
      <div>
        <SizeForm
          formSubmitted={this.state.formSubmitted}
          submitSize={this.submitSize}
        />
        <h1 className={this.state.formSubmitted ? "" : "hide"}>
          The Game of Life
        </h1>
        <Buttons
          playButton={this.playButton}
          pauseButton={this.pauseButton}
          slow={this.slow}
          fast={this.fast}
          clear={this.clear}
          seed={this.seed}
          gridSize={this.gridSize}
          formSubmitted={this.state.formSubmitted}
        />
        <Grid
          gridFull={this.state.gridFull}
          rows={this.rows}
          cols={this.cols}
          selectBox={this.selectBox}
          formSubmitted={this.state.formSubmitted}
        />
        <h2 className={this.state.formSubmitted ? "" : "hide"}>
          Generations: {this.state.generation}
        </h2>
      </div>
    );
  }
}

function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

ReactDOM.render(<Main />, document.getElementById("root"));
