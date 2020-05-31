import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Radio,
  FormLabel,
  FormControlLabel,
  FormControl,
  RadioGroup,
  Button,
  LinearProgress,
  FormHelperText,
  TextField,
} from "@material-ui/core";

function ShowQuiz(props) {
  let quiz = props.quizz;

  const [time, setTime] = useState(100);
  const [toggle, setToggle] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(0);
  const [originalAnswer, setOriginalAnswer] = useState(0);
  const [fillAnswer,setFillAnswer]=useState("");
  const [points, setPoint] = useState(0);
  const [questionNumber, setNumber] = useState(0);
  const [helperText, setHelperText] = useState("");
  const handleAnswer = (event, ans) => {
    setSelectedAnswer(event.target.value);
    setOriginalAnswer(ans);
  };
  useEffect(() => {
    let newPlayer = [...props.participants];
    const p = {
      name: props.name,
      scores: points,
    };
    const i = newPlayer.findIndex((data) => {
      return data.name === props.name;
    });
    if (i === -1) {
      newPlayer.push(p);
    } else {
      newPlayer[i] = p;
    }
    newPlayer.sort(function (a, b) {
      return a["scores"] - b["scores"];
    });
    newPlayer.reverse();
    props.setParticipants(newPlayer);
  }, [points]);
  /*var timeObject=setInterval(quizTimer(),1000);
  function quizTimer() {
    var b;
    if (time <= 0) {
      clearInterval(timeObject);
    } else {
      var i = time;
      i = i - 4;
      setTime(i);
      console.log(time);
    }
  }*/

  const checkAnswer = () => {
    if(quiz[questionNumber].type===1){
      if (parseInt(selectedAnswer) === 0) {
        setHelperText("select something");
      } else if (parseInt(selectedAnswer) === parseInt(originalAnswer)) {
        setHelperText("you got it");
        var p = points + 10;
        setPoint(p);
        checkNextQuestion();
      } else {
        setHelperText("Sorry, wrong answer");
        checkNextQuestion();
      }
    }
    else if(quiz[questionNumber].type===2){
      if (fillAnswer === "") {
        setHelperText("write something");
      } else if (quiz[questionNumber].answer=== fillAnswer) {
        setHelperText("you got it");
        var p = points + 10;
        setPoint(p);
        checkNextQuestion();
      } else {
        setHelperText("Sorry, wrong answer");
        checkNextQuestion();
      }
    }
  };
  const checkNextQuestion = () => {
    if (questionNumber + 1 < quiz.length) {
      var i = questionNumber;
      i++;
      setNumber(i);
      setSelectedAnswer(0);
    } else {
      setToggle(true);
      setHelperText("Quiz over");
    }
  };
  return (
    <div>
      <div className="timer">
        <LinearProgress
          variant="determinate"
          value={time}
          color="secondary"
        ></LinearProgress>
      </div>
      <div style={{ top: "0", marginTop: "2%" }}>
        <b style={{ float: "left" }}>Points : {points}</b>
        <Button
          style={{ float: "right" }}
          variant="contained"
          color="secondary"
          onClick={() => {
            setToggle(true);
            alert("Quiz over");
          }}
        >
          End Test
        </Button>
      </div>
      <div className="content-body">
        <FormControl component="fieldset">
          <FormLabel
            style={{
              marginLeft: "-10%",
              font: "bold",
              fontSize: "30px",
              color: "#2a3eb1",
            }}
          >
            {questionNumber + 1}
            {"."}
            {quiz[questionNumber].question}
          </FormLabel>
          {quiz[questionNumber].type === 1 && (
            <RadioGroup
              value={selectedAnswer}
              onChange={(event) => {
                handleAnswer(event, quiz[questionNumber].option);
              }}
            >
              <FormControlLabel
                value="1"
                control={<Radio />}
                label={quiz[questionNumber].option1}
              />
              <FormControlLabel
                value="2"
                control={<Radio />}
                label={quiz[questionNumber].option2}
              />
              <FormControlLabel
                value="3"
                control={<Radio />}
                label={quiz[questionNumber].option2}
              />
              <FormControlLabel
                value="4"
                control={<Radio />}
                label={quiz[questionNumber].option4}
              />
            </RadioGroup>
          )}
          {quiz[questionNumber].type === 2 && (
            <div className="margin">
              <TextField
                variant="standard"
                label="Type Answer..."
                fullWidth
                onChange={(event)=>{
                  setFillAnswer(event.target.value);
                }}
              ></TextField>
            </div>
          )}
          <FormHelperText error>{helperText}</FormHelperText>
        </FormControl>
        <div className="margin">
          <Button
            disabled={toggle}
            variant="contained"
            color="primary"
            onClick={checkAnswer}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    quizz: state.totalQuizz,
    name: state.name,
    participants: state.participants,
  };
};
const mapDispathToProps = (dispatch) => {
  return {
    setParticipants: (p) => {
      dispatch({
        type: "SET_PARTICIPANTS",
        participants: p,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispathToProps)(ShowQuiz);
