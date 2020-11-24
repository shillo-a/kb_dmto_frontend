import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import {App} from './App';
import store from '../src/store';
import { checkLogin } from '../src/modules/Authorization/authorizationSlice';

/*проверяем, остлася ли сохраненный JWT token в localStorage
только после проверки выполняем render всего портала*/
store.dispatch(checkLogin())
  .then(()=>{
    ReactDOM.render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>,
      document.getElementById('root')
    );
  })


