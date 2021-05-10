import { SET_MESSAGE } from './messageTypes';

export const setMessage = (content, type) => ({
  payload: {
    content,
    type,
  },
  type: SET_MESSAGE,
});