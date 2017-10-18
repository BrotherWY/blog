import { message } from 'antd';
import dva from 'dva';
import createLoading from 'dva-loading';
import createHistory from 'history/createBrowserHistory';
import './index.css';

// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true,
  }),
  history: createHistory(),
  onError(error) {
    message.error(error.message);
  },
});

// 2. Plugins


// 3. Model
app.model(require('./models/User'));
app.model(require('./models/Catalog'));
app.model(require('./models/Tag'));
app.model(require('./models/Article'));
app.model(require('./models/Menu'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
