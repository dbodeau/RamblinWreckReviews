import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { Amplify } from 'aws-amplify';
import awsconfig from '../aws-exports';
import store from './redux/store';
import { Provider } from 'react-redux';

Amplify.configure(awsconfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
//code that renders the application
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
