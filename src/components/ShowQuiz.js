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
  Checkbox,
} from "@material-ui/core";
import {useHistory} from 'react-router-dom';

function ShowQuiz(props) {

  let quiz = props.quizz;
  let checkboxAnswers = [];
  const [answerBox, setAnswerBox] = useState([]);
  const [time, setTime] = useState(100);
  const [toggle, setToggle] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(0);
  const [originalAnswer, setOriginalAnswer] = useState(0);
  const [fillAnswer, setFillAnswer] = useState("");
  const [points, setPoint] = useState(0);
  const [questionNumber, setNumber] = useState(0);
  const [helperText, setHelperText] = useState("");
  const history=useHistory();
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

  const handleCheck = (event, v) => {
    if (event.target.checked === true) {
      checkboxAnswers = [...answerBox, v];
    } else {
      checkboxAnswers = [...answerBox];
      let newArray = checkboxAnswers.filter((data) => {
        return data !== v;
      });
      checkboxAnswers = [...newArray];
    }
    setAnswerBox(checkboxAnswers);
  };
  //var count = 30;
  /*useEffect(() => {
    let timerObj = setInterval(function () {
      //count = count - 1;
      setTime((time) => time - 1);
      console.log(time);
      if (time === 0) {
        console.log("time up");
        clearInterval(timerObj);
        checkNextQuestion();
      }
    }, 1000);
  }, []);
  const stopInterval = () => {};*/
  const checkAnswer = () => {
    if (quiz[questionNumber].type === 1) {
      if (parseInt(selectedAnswer) === parseInt(originalAnswer)) {
        setHelperText("you got it");
        var p = points + 10;
        setPoint(p);
        checkNextQuestion();
      } else {
        setHelperText("Sorry, wrong answer");
        checkNextQuestion();
      }
    } else if (quiz[questionNumber].type === 2) {
      if (quiz[questionNumber].answer === fillAnswer) {
        setHelperText("you got it");
        var p = points + 10;
        setPoint(p);
        checkNextQuestion();
      } else {
        setHelperText("Sorry, wrong answer");
        checkNextQuestion();
      }
    } else if (quiz[questionNumber].type === 3) {
      if (isEqual(quiz[questionNumber].answerBox, answerBox)) {
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
    setHelperText("");
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
  const isEqual = (arr1, arr2) => {
    var a1 = arr1.sort().toString();
    var a2 = arr2.sort().toString();
    return a1 === a2;
  };
  return (
    <div>
      <div className="timer">
        <LinearProgress
          variant="determinate"
          value={time}
          color="secondary"
          //onChange={(event) => {
            //setTime(event.target.value);
          //}}
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
            setHelperText("Quiz over");
            alert("Quiz over");
            history.push("/");
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
                label={quiz[questionNumber].option3}
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
                onChange={(event) => {
                  setFillAnswer(event.target.value);
                }}
              ></TextField>
            </div>
          )}
          {quiz[questionNumber].type === 3 && (
            <div>
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(event) => {
                        handleCheck(event, 1);
                      }}
                    />
                  }
                  label={quiz[questionNumber].option1}
                />
              </div>
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(event) => {
                        handleCheck(event, 2);
                      }}
                    />
                  }
                  label={quiz[questionNumber].option2}
                />
              </div>
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(event) => {
                        handleCheck(event, 3);
                      }}
                    />
                  }
                  label={quiz[questionNumber].option3}
                />
              </div>
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(event) => {
                        handleCheck(event, 4);
                      }}
                    />
                  }
                  label={quiz[questionNumber].option4}
                />
              </div>
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
