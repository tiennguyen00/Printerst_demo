import { SET_MESSAGE } from './messageTypes';
// =======================
// ======================
const initialState = {
    message: {}
}

export default (state = initialState.message, action) => {
    switch (action.type) {
      case SET_MESSAGE:
        return action.payload || null;
      default:
        return state;
    }
};
  