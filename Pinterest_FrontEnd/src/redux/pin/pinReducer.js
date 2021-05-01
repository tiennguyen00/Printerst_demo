import { ADD_PINS } from "./pinTypes";

const initialState = {
  pins: [],
};

const pinReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PINS:
      return {
        pins: action.payLoad,
      };
    default:
      return state;
  }
};

export default pinReducer;
