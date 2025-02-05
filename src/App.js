
import React from 'react'
//import logo from './logo.svg'
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Test from './pgs/Test'
import Home from './pgs/Home2' 


function App() {

  return (
  <Router>
  <div> 

    <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route exact path="/test">
      <Test />
    </Route>
    </Switch>

  </div>
  </Router>
  )
}

export default App;
