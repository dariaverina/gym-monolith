import './bootstrap';
import React from 'react';
import ReactDOM  from 'react-dom';
import App from './components/App';
import { createRoot } from 'react-dom/client'
import Layout from './components/common/Layout/Layout';
import Clubs from './components/Clubs';
import Users from './components/manager/Dashboard/Users/Users';

if (document.getElementById('users')){
    createRoot(document.getElementById('users')).render(<Layout><Users/></Layout>)
}