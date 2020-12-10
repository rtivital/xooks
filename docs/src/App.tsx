import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AppContainer from './components/AppContainer/AppContainer';
import GettingStartedRoute from './routes/getting-started/GettingStarted.route';
import './global.styles.less';

export default function App() {
  return (
    <BrowserRouter>
      <AppContainer>
        <Switch>
          <Route path="/" exact>
            <GettingStartedRoute />
          </Route>
          <Route>404</Route>
        </Switch>
      </AppContainer>
    </BrowserRouter>
  );
}
