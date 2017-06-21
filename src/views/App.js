import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from './home';

let Router = BrowserRouter;

export class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route render={function() {
              return <p> 404 - Not Found </p>
            }}/>
          </Switch>
        </div>
      </Router>
    )
  }
}
