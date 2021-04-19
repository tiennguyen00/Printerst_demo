import { createStore } from 'redux';
import pinReducer from './pin/pinReducer';

const store = createStore(pinReducer)

export default store;