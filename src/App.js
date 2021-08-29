import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './components/Header/index';
import Dashboard from './components/Dashboard/index';
import Form from './components/Form/index';
import Details from './components/Details/index';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/suculenta/:id" component={Form} />
        <Route path="/details/:id" component={Details} />
        <Route path="/:name" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}