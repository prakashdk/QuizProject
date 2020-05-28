import React from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

import CreateQuiz from "./components/CreateQuiz";
import JoinQuiz from "./components/JoinQuiz";
import { CardMedia } from "@material-ui/core";
import logo from "./Images/logo.png";

import "./App.css";
import { connect } from "react-redux";

function App() {
  return (
    <Router>
      <h1 className="head">Quizz</h1>
      <div className="first-body">
        <div className="drawer">
          <Link className="join" to="/join">
            join a game
          </Link>
        </div>
        <div className="drawer">
          <Link className="create" to="/create">
            create quiz
          </Link>
        </div>
      </div>

      <Switch>
        <Route exact path="/join">
          <JoinQuiz></JoinQuiz>
        </Route>
        <Route exact path="/create">
          <CreateQuiz></CreateQuiz>
        </Route>
        <Route>
          <img className="logo" src={logo} alt="Logo" />
        </Route>
      </Switch>
    </Router>
  );
}
export default connect()(App);
