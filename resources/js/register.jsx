import './bootstrap';
import React from 'react';
import ReactDOM  from 'react-dom';
import App from './components/App';
import { createRoot } from 'react-dom/client'

if (document.getElementById('register')){
    // createRoot(<App/>, document.getElementById('app')) 
    createRoot(document.getElementById('register')).render(<div>register</div>)
}