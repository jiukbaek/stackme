import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Router } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";
import ReduxThunk from "redux-thunk";
import rootReducer from "./modules";
import { createBrowserHistory } from "history";

const customHistory = createBrowserHistory();

const store = createStore(
  rootReducer,
  applyMiddleware(ReduxThunk.withExtraArgument({ history: customHistory }))
);

ReactDOM.render(
  <Router history={customHistory}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);
