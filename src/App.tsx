import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import RouterComponent from '@/routes';
import * as store from '@/store';
import './app.css';
import Login from '@/pages/login'

const App = () => {
  return (
    <Provider store={store}>
      <div className='App'>
        <React.Suspense>
          <BrowserRouter>
            <header>layout 写在这里</header>
            <RouterComponent />
          </BrowserRouter>
        </React.Suspense>
      </div>
    </Provider>
  );
};

export default App;


