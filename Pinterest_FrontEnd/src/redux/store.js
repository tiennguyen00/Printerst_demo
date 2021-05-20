import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import pinReducer from "./pin/pinReducer";
import viewerReducer from "./viewer/viewerReducer";
import messageReducer from "./message/messageReducer";
import userReducer from "./user/userReducer";
import fileReducer from "./file/fileReducers";
// import thunk from 'redux-thunk';  Middleware viết các Action trả về một function thay vif plain js. xử lý các logic bất đồng bộ cần truy cập đến store

const rootReducers = combineReducers({
  pinReducer,
  viewerReducer,
  messageReducer,
  userReducer,
  fileReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducers, composeEnhancers());

export default store;
