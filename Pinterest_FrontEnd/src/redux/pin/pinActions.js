import { ADD_PINS } from "./pinTypes";

export const apiPins = (pins) => {
  return {
    type: ADD_PINS,
    payLoad: pins,
  };
};
