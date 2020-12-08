import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomeRoute from './routes/home/Home.route';
import './global.styles.less';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <HomeRoute />
        </Route>
        <Route>404</Route>
      </Switch>
    </BrowserRouter>
  );
}
