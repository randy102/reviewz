import React from 'react';
import './SCSS/Reset.scss';
import AppProvider from './Utils/provider';
import Routes from './Routes/index'

export default function App() {
  return (
    <AppProvider>
      <Routes/>
    </AppProvider>
  );
}
