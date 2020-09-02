import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { LandingPage } from './components/LandingPage/Landingpage';
import ErrorBoundry from './components/ErrorBoundary/Errorboundary';
import Dashboard from './components/Dashboard/Dashboard'
import ProtectedRouter from './components/Router/ProtectedRouter'
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

function App() {
  return (
    <ErrorBoundry>
      
            <BrowserRouter>
        <Switch>
          <ProtectedRouter
            path="/dashboard"
            Component={(props) => <Dashboard {...props} />}
          />
          <Route path="/" component={(props) => <LandingPage {...props} />} />
          <Route path="*" render={() => <Redirect to="/signup" />} />
        </Switch>
      </BrowserRouter>
      <ReactNotification/>
    </ErrorBoundry>
  );
}

export default App;
