import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
import App from './routes/App';

function RouterConfig({ history, app }) {
  const home = dynamic({
    app,
    component: () => import('./routes/home/Home'),
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
        </Switch>
        <Route exact path="/admin/login" component={login} />
      </div>
    </Router>
  );
}

export default RouterConfig;
