import './bootstrap';
import React from 'react';
import ReactDOM  from 'react-dom';
import App from './components/App';
import ClubsMap from './components/clubs/ClubsMap/Map';
import { createRoot } from 'react-dom/client'
import Layout from './components/common/Layout/Layout';

if (document.getElementById('clubs')){
    // createRoot(<App/>, document.getElementById('app')) 
    createRoot(document.getElementById('clubs')).render(<Layout><ClubsMap/></Layout>)
}