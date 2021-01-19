import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";
import Dashboard from "./components/Dashboard";
import AddWebsite from "./components/AddWebsite";
import WebsiteInfo from "./components/WebsiteInfo";
import Header from "./components/Header";
import HomePage from "./components/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/dashboard" exact>
          <Dashboard />
        </Route>
        <Route path="/addWebsite" exact>
          <AddWebsite />
        </Route>
        <Route path="/websites/:id">
          <WebsiteInfo />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
