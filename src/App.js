import React from 'react';
import AppProvider from './Utils/provider';
import Routes from './Routes/index'
import 'bootstrap/dist/css/bootstrap.min.css';
import './SCSS/Reset.scss';

export default function App() {
  return (
    <AppProvider>
      <Routes/>
    </AppProvider>
  );
}
