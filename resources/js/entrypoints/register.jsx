import '../bootstrap';
import React from 'react';
import ReactDOM  from 'react-dom';
import App from '../components/App';
import { createRoot } from 'react-dom/client'
import Registration from '../components/registration/Registration';
import Layout from '../components/common/Layout/Layout';

if (document.getElementById('register')){
    // createRoot(<App/>, document.getElementById('app')) 
    createRoot(document.getElementById('register')).render(<Layout><Registration/></Layout>)
}