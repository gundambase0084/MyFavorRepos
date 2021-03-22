import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

var script = document.createElement('script');
script.type = 'text/javascript';
script.async = true;
script.src = './srcipts/layui255/layui.js';
document.head.appendChild(script);
var _link = document.createElement('link');
_link.rel = 'stylesheet';
_link.async = true;
_link.href = './srcipts/layui255/css/layui.css';
document.head.appendChild(_link);

ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
    <App />
  </BrowserRouter>,
  rootElement);

registerServiceWorker();

