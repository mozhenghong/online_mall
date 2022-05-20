import React from "react";
import { HashRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import RouterComponent from "@/routes";
import * as store from "@/store";
import "./app.css";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <React.Suspense>
          <HashRouter>
            <RouterComponent />
          </HashRouter>
        </React.Suspense>
      </div>
    </Provider>
  );
};

export default App;
