import dva from 'dva';
import createLoading from 'dva-loading';
import './index.css';

// 1. Initialize
const app = dva(createLoading());

// 2. Plugins


// 3. Model
app.model(require('./models/User'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
