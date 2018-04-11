import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './store';
import Home from './Screens/Home'
import Post from './Screens/Post'
import './DB'

// Comment!
const FourOhFour = () => <h1>404</h1>;

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/skeleton" component={Home} />
          <Route path="/news/:slug" component={Post} />
          <Route component={FourOhFour} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
);


render(<App/>, document.getElementById('container'));