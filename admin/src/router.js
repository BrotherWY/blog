import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
import App from './routes/App';

function RouterConfig({ history, app }) {
  const home = dynamic({
    app,
    component: () => import('./routes/dashboard/DashBoard'),
  });

  const login = dynamic({
    app,
    component: () => import('./routes/Login'),
  });

  return (
    <Router history={history}>
      <div style={{ height: '100%' }}>
        <Switch>
          <Route
            path="/:name" exact component={props => (
              <App {...props}>
                <Switch>
                  <Route exact path="/home" component={home} />
                </Switch>
              </App>
            )}
          />
          <Route exact path="/" component={login} />
        </Switch>
      </div>
    </Router>
  );
}

export default RouterConfig;
