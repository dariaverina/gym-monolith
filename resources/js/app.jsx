import './bootstrap';
import React from 'react';
import ReactDOM  from 'react-dom';
import App from './components/App';
import { createRoot } from 'react-dom/client'

if (document.getElementById('app')){
    // createRoot(<App/>, document.getElementById('app')) 
    createRoot(document.getElementById('app')).render(<App/>)
}