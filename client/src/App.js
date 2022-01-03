import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Home from "./components/Home"
import LandingPage from './components/LandingPage';
import './App.css';
import CreateActivity from './components/CreateActivity';
import Detail from './components/Detail';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route exact path="/home" component={Home}/>
          <Route exact path="/activity" component={CreateActivity}/>
          <Route exact path="/detail/:id" component={Detail}/>
        </Switch>
      </div>

    </BrowserRouter>
  );
}

export default App;
