import { ADD_PINS } from './pinTypes';

export const apiPins = (pins) => {
    console.log("Pin nhận được ở action: ", pins);
    return {
        type: ADD_PINS,
        payLoad: pins   
    }
}