import React, { useState } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import { TextField, Button, FormHelperText } from "@material-ui/core";
import QuizFundamentals from "./QuizFundamentals";
import { connect } from "react-redux";

function CreateQuiz() {
  const [password, setPassword] = useState("");
  const pwd = "createquiz@own";
  return (
    <Router>
      <Switch>
        {pwd === password && (
          <Route exact path="/create/create-quizz">
            <QuizFundamentals></QuizFundamentals>
          </Route>
        )}
        <Route>
          <div className="content-body">
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <FormHelperText style={{textAlign:"center"}} error>{"Only 3 attempts left"}</FormHelperText>
            <div className="margin">
              <Link className="pwd" to="/create/create-quizz">
                CREATE
              </Link>
            </div>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}
export default connect()(CreateQuiz);