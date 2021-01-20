import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'mobx-react'
import { GeneralStore as generalStore } from './stores/GeneralStore'
import { SearchStore as searchStore } from './stores/SearchStore'
import { UserStore as userStore } from './stores/UserStore'
import { MessagesStore as messagesStore } from './stores/MessagesStore'

const GeneralStore = new generalStore()
const SearchStore = new searchStore()
const UserStore = new userStore()
const MessagesStore = new messagesStore()

const stores = {
  GeneralStore,
  SearchStore,
  UserStore,
  MessagesStore
}

ReactDOM.render(
  <React.StrictMode>
    <Provider {...stores}>
      <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
