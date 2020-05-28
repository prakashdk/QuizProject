const initialState = {
  totalQuizz: [{
    option: 4,
    answer: 0,
    option1: "Ready",
    option2: "Get",
    option3: "Set",
    option4: "Go",
    question: "Status of your quiz...(For Checking)",
  }],
  code: 123456,
  name:"",
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_QUIZ":
      return {
        ...state,
        totalQuizz: action.quizz,
      };
    case "SET_CODE":
      return {
        ...state,
        code: action.code,
      };
      case "SET_NAME":
      return {
        ...state,
        name: action.name,
      };
    default:
      return {
        ...state,
      };
  }
}
