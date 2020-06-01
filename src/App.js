import React from 'react';
import './App.css';
import Home from './Components/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import { Provider } from 'react-redux';
import { store } from './Redux/Store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/dashboard" component={Dashboard}></Route>
          <Route path="/" component={Home}></Route>
        </Switch>
      </Router>
      </Provider>
    </div>
  );
}

export default App;
