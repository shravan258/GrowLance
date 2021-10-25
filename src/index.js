import ReactDOM from 'react-dom';
import { DataProvider } from './customHooks/DataProvider';

import './index.css';
import App from './App';

ReactDOM.render(
  <DataProvider>
    <App />
  </DataProvider>,
  document.getElementById('root')
);
