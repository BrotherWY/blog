import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
import App from './routes/App';

function RouterConfig({ history, app }) {
  const home = dynamic({
    app,
    component: () => import('./routes/home/Home'),
  });
  return (
    <Router history={history}>
      <Switch>
        <Route
          path="/:name" component={props => (
            <App {...props}>
              <Switch>
                <Route exact path="/home" component={home} />
              </Switch>
            </App>
          )}
        />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
