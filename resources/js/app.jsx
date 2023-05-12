import './bootstrap';
import React from 'react';
import ReactDOM  from 'react-dom';
import App from './components/App';
import { createRoot } from 'react-dom/client'
import Layout from './components/common/Layout/Layout';


if (document.getElementById('app')){
    // createRoot(<App/>, document.getElementById('app')) 
    createRoot(document.getElementById('app')).render(<Layout><App/></Layout>)
}