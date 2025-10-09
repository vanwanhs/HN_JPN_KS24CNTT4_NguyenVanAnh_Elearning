import React from "react";
import './index.css';
import ReactDOM from "react-dom/client";
import AppRouter from "./routers/AppRouter"; 
import { Provider } from "react-redux";
import { store } from "./store/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
      <AppRouter />
    </Provider>
);