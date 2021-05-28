import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import pinReducer from "./pin/pinReducer";
import viewerReducer from "./viewer/viewerReducer";
import messageReducer from "./message/messageReducer";
import userReducer from "./user/userReducer";
import fileReducer from "./file/fileReducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; //default to localStorage for web
// import thunk from 'redux-thunk';  Middleware viết các Action trả về một function thay vif plain js. xử lý các logic bất đồng bộ cần truy cập đến store

const rootReducers = combineReducers({
  pinReducer,
  viewerReducer,
  messageReducer,
  userReducer,
  fileReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //Redux tool

//Presist-redux
const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["userReducer"],
};
const pReducer = persistReducer(persistConfig, rootReducers);

const store = createStore(
  // rootReducers,
  pReducer,
  composeEnhancers()
);

console.log("Store: ", store.getState());

export default store;
export const persistor = persistStore(store);
