const initialState = {
  totalQuizz: [],
  code: 123456,
  name: "",
  participants: [],
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
    case "SET_PARTICIPANTS":
      return {
        ...state,
        participants: action.participants,
      };
    default:
      return {
        ...state,
      };
  }
}
