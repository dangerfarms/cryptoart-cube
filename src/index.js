import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import CubeMain from './components/react/CubeMain';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <CubeMain key="CubeMain" data={data} />
  </React.StrictMode>,
  document.getElementById('root'),
);
