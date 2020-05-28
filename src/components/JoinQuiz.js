import React, { useState } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import { TextField } from "@material-ui/core";
import { connect } from "react-redux";
import ShowQuiz from "./ShowQuiz";
import {FormHelperText} from '@material-ui/core';

function JoinQuiz(props) {
  const [gameCode, setCode] = useState(0);
  const handleGame = (event) => {
    setCode(event.target.value);
  };
  return (
    <Router>
      <div className="content-body">
        <Switch>
          {parseInt(props.code) === parseInt(gameCode) && (props.name).length >= 7 && (
            <Route exact path="/join/join-quizz">
              <ShowQuiz></ShowQuiz>
            </Route>
          )}
          <Route>
            <TextField
              label="Enter Name"
              variant="outlined"
              onChange={(event) => {
                props.setName(event.target.value);
              }}
            />
            <FormHelperText style={{textAlign:"center"}} error>{"More than 7 characters"}</FormHelperText>
            <div className="margin">
              <TextField
                label="Game Code"
                variant="outlined"
                onChange={handleGame}
              />
              <FormHelperText style={{textAlign:"center"}} error>{"Contact admin for game code"}</FormHelperText>
            </div>
            <div className="margin">
              <Link className="pwd" to="/join/join-quizz">
                JOIN
              </Link>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    code: state.code,
    name: state.name,
  };
};
const mapDispathToProps = (dispatch) => {
  return {
    setName: (name) => {
      dispatch({
        type: "SET_NAME",
        name: name,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispathToProps)(JoinQuiz);
