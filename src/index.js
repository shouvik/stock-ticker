import * as Rx from "rxjs";
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

const ws = new WebSocket("ws://stocks.mnet.website")
const root = document.getElementById('root')

const createWebSocket = (ws) => Rx.Observable.create(
  (observer) => {
    ws.onmessage = observer.next.bind(observer);
    ws.onerror = observer.error.bind(observer);
    ws.onclose = observer.complete.bind(observer);
    return ws.close.bind(ws);
  }
);

var messages = createWebSocket(ws)

messages.subscribe((socket) => {
  ReactDOM.render(<App ticker={socket.data} />, root);
  registerServiceWorker();
})
