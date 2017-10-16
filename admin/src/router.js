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

  const WriteArticle = dynamic({
    app,
    component: () => import('./routes/article/WriteArticle'),
  });

  const Tag = dynamic({
    app,
    component: () => import('./routes/tag/Tag'),
  });

  return (
    <Router history={history}>
      <div style={{ height: '100%' }}>
        <Switch>
          <Route
            path="/:name" component={props => (
              <App {...props}>
                <Switch>
                  <Route exact path="/dashboard" component={home} />
                  <Route exact path="/article/write" component={WriteArticle} />
                  <Route exact path="/tag" component={Tag} />
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
