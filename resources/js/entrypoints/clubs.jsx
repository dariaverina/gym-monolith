import '../bootstrap';
import React from 'react';
import ReactDOM  from 'react-dom';
import App from '../components/App';
import { createRoot } from 'react-dom/client'
import Layout from '../components/common/Layout/Layout';
import Clubs from '../components/manager/Dashboard/Clubs/Clubs';

if (document.getElementById('clubs')){
    createRoot(document.getElementById('clubs')).render(<Layout><Clubs/></Layout>)
}