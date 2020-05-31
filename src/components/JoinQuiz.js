import React, { useState } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import { TextField } from "@material-ui/core";
import { connect } from "react-redux";
import ShowQuiz from "./ShowQuiz";
import { FormHelperText } from "@material-ui/core";

function JoinQuiz(props) {
  const [gameCode, setCode] = useState(0);
  const [helperText, setHelperText] = useState("");
  const [codeHelperText, setCodeHelperText] = useState(
    "contact admin for game code"
  );
  const [error, setError] = useState(false);
  const [link, setLink] = useState("");
  const handleGame = (event) => {
    setCode(event.target.value);
  };
  var handlePage = () => {
    if (parseInt(props.code) === parseInt(gameCode)) {
      setError(false);
      setCodeHelperText("");
      let players = [...props.participants];
      const i = players.findIndex((data) => {
        return data.name === props.name;
      });
      if (i === -1) {
        setLink("/join/join-quizz");
      } else {
        setLink("");
        setHelperText("this name is already taken");
      }
    } else {
      setError(true);
      setCodeHelperText("Invalid code");
    }
  };
  return (
    <Router>
      <div className="content-body">
        <Switch>
          <Route exact path="/join/join-quizz">
            <ShowQuiz></ShowQuiz>
          </Route>
          <Route>
            <TextField
              color="primary"
              label="Enter Name"
              variant="outlined"
              onChange={(event) => {
                props.setName(event.target.value);
              }}
            />
            <FormHelperText style={{ textAlign: "center" }} error>
              {helperText}
            </FormHelperText>
            <div className="margin">
              <TextField
                label="Game Code"
                error={error}
                variant="outlined"
                onChange={handleGame}
              />
              <FormHelperText style={{ textAlign: "center" }} error>
                {codeHelperText}
              </FormHelperText>
            </div>
            <div className="margin">
              <Link className="pwd" to={link} onClick={handlePage}>
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
    participants: state.participants,
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
