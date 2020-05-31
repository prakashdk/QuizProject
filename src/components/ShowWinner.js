import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, deepPurple } from "@material-ui/core/colors";

function ShowWinner(props) {
  const useStyles = makeStyles((theme) => ({
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
  }));
  const classes = useStyles();
  return (
    <div className="winner">
      <div className="avatar">
        <Avatar className={classes.orange}>
          {props.player[0].name.charAt(0).toUpperCase()}
        </Avatar>
      </div>
      <div className="winner-point">
        The winner is
        <div className="winner-name">{props.player[0].name}!</div>
        with <span className="winner-name">{props.player[0].scores}</span> points
      </div>
    </div>
  );
}
const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    player: state.participants,
  };
};
export default connect(mapStateToProps)(ShowWinner);
