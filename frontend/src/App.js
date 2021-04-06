import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';

import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';


function App() {
  return (
    <Router >
    <Switch>
      <Route path="/" exact>
        <LoginPage />
      </Route>
      <Route path="/SignUp" exact>
        <SignUpPage />
      </Route>
      <Redirect to="/" />
    </Switch>
    </Router>
  );
}

export default App;