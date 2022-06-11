import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import RouterComponent from '@/routes';
import * as store from '@/store';
import './App.css';

const App = () => {
    return (
        <Provider store={store}>
            <div className="App">
                <React.Suspense>
                    <BrowserRouter>
                        <RouterComponent/>
                    </BrowserRouter>
                </React.Suspense>
            </div>
        </Provider>
    );
};

export default App;
