import React from 'react';
import './App.css';
import Main from './component/main';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

function App() {
  return (
      <Provider store={store}>
          <Router >
            <div className="App">
              <Main />
            </div>
          </Router>
      </Provider>
  );
}

export default App;
