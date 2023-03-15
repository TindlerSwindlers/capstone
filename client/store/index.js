import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import auth from "./auth";
import posts from "./posts";
import comments from "./comments";
import halfways from "./halfways";
import matches from "./matches";

const reducer = combineReducers({ auth, posts, comments, halfways, matches });
const middleware = applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
export * from "./posts";
