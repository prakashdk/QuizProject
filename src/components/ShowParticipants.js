import React, { useState } from "react";
import { connect } from "react-redux";
import {
  TableContainer,
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  Button,
  Dialog,
  DialogTitle,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import ShowWinner from "./ShowWinner";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function ShowParticipants(props) {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const handleEnd = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setPassword(event.target.value);
  };
  const handleWinner = () => {
    if (password === "" || password == null || password === undefined) {
      setHelperText("Enter Password");
      setError(true);
    } else if (password === "createquiz@own") {
      setLink("/participants/winner");
      setOpen(false);
      setHelperText("Verified,now just click end");
    } else {
      setError(true);
      setHelperText("Invalid password");
    }
  };
  return (
    <div className="content-body">
      <Router>
        <Switch>
          <Route exact path="/participants/winner">
            <ShowWinner></ShowWinner>
          </Route>
          <Route>
            <TableContainer>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Position</TableCell>
                    <TableCell>Player Name</TableCell>
                    <TableCell>Points</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>{props.participants[0].name}</TableCell>
                    <TableCell>{props.participants[0].scores}</TableCell>
                  </TableRow>
                  {props.participants.map((data, i) => {
                    if (i !== 0) {
                      return (
                        <TableRow key={data.name}>
                          <TableCell>{i + 1}</TableCell>
                          <TableCell>{data.name}</TableCell>
                          <TableCell>{data.scores}</TableCell>
                        </TableRow>
                      );
                    }
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <div className="margin">
              <Button variant="contained" color="secondary" onClick={handleEnd}>
                End Quiz
              </Button>
            </div>
            <Dialog open={open}>
              <div style={{ padding: "20px" }}>
                <DialogTitle>Are you sure want to end Quiz</DialogTitle>
                <TextField
                  label="Enter password"
                  variant="filled"
                  color="primary"
                  type="password"
                  error={error}
                  onChange={handleChange}
                ></TextField>
                <FormHelperText error={error}>{helperText}</FormHelperText>
                <div className="margin">
                  <Link to={link} className="end" onClick={handleWinner}>
                    End
                  </Link>
                  <Button
                    style={{ float: "right", marginTop: "-3%" }}
                    onClick={handleClose}
                    variant="contained"
                    color="primary"
                  >
                    View results
                  </Button>
                </div>
              </div>
            </Dialog>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    participants: state.participants,
  };
};

export default connect(mapStateToProps)(ShowParticipants);
