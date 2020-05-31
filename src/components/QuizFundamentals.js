import React from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import Mcq from "./Mcq";
import { connect } from "react-redux";
function QuizFundamentals() {
  return (
    <Router>
      <div className="content-body">
        <Switch>
          <Route exact path="/create/create-quizz/mcq">
            <Mcq event={1}></Mcq>
          </Route>
          <Route exact path="/create/create-quizz/fill">
            <Mcq event={2}></Mcq>
          </Route>
          <Route exact path="/create/create-quizz/cb">
            <Mcq event={3}></Mcq>
          </Route>
          <Route>
            <div className="margin">
              <Link className="pwd" to="/create/create-quizz/mcq">
                Muliple choice
              </Link>
            </div>
            <div className="margin">
              <Link className="pwd" to="/create/create-quizz/fill">Fill in the blank</Link>
            </div>
            <div className="margin">
              <Link className="pwd" to="/create/create-quizz/cb">Check Box</Link>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default connect()(QuizFundamentals);