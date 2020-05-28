import React, { useState } from "react";
import { connect } from "react-redux";
import {
  TextField,
  Radio,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from "@material-ui/core";

function Mcq(props) {
  const [option, setOption] = useState(0);
  const [answer, setAnswer] = useState(0);
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [question, setQuestion] = useState("");
  var i=0;
  let quizz = [];
  const handleSubmit = () => {
    setAnswer(i++);
    let newQuizz = {
      option: option,
      answer: answer,
      option1: option1,
      option2: option2,
      option3: option3,
      option4: option4,
      question: question,
    };
    if (!isEmpty(question) && option !== 0) {
      quizz=[...props.totalQuizz,newQuizz];
      props.setQuizz(quizz);
      setQuestion("");
      setOption1("");
      setOption2("");
      setOption3("");
      setOption4("");
      setOption(0);
    } else {
      alert("Fill all fields");
    }
  };
  const handleEnd = () => {
    let code=Math.round(100000+(Math.random()*899999));
    props.setCode(code);
    alert(code);
  };
  const isEmpty = (a) => {
    return a === null || a === undefined || a === "";
  };
  return (
    <>
      <div className="content-body">
        <TextField
        value={question}
          variant="filled"
          label="write a question here"
          fullWidth
          onChange={(event) => {
            setQuestion(event.target.value);
          }}
        />
        <div>
          <FormControl component="fieldset">
            <RadioGroup
            value={option}
              onChange={(event) => {
                setOption(event.target.value);
              }}
            >
              <FormControlLabel value="1" control={<Radio />} />
              <TextField
              value={option1}
                variant="filled"
                label="Answer option 1"
                onChange={(event) => {
                  setOption1(event.target.value);
                }}
              />
              <FormControlLabel value="2" control={<Radio />} />
              <TextField
              value={option2}
                variant="filled"
                label="Answer option 2"
                onChange={(event) => {
                  setOption2(event.target.value);
                }}
              />
              <FormControlLabel value="3" control={<Radio />} />
              <TextField
                value={option3}
                variant="filled"
                label="Answer option 3"
                onChange={(event) => {
                  setOption3(event.target.value);
                }}
              />
              <FormControlLabel value="4" control={<Radio />} />
              <TextField
              value={option4}
                variant="filled"
                label="Answer option 4"
                onChange={(event) => {
                  setOption4(event.target.value);
                }}
              />
            </RadioGroup>
          </FormControl>
          <div></div>
        </div>
        <div className="margin">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Next
          </Button>
          <Button variant="contained" color="secondary" onClick={handleEnd}>
            End
          </Button>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state,ownProps) => {
  return {
    ...ownProps,
    totalQuizz: state.totalQuizz,
}
};
const mapDispathToProps = (dispatch) => {
  return{
    setQuizz: (quizz) => {
      dispatch({
        type: "SET_QUIZ",
        quizz:quizz,
      });
    },
    setCode: (code) => {
      dispatch({
        type: "SET_CODE",
        code:code,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispathToProps)(Mcq);
