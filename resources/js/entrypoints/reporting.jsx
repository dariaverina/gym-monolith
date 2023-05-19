import React from 'react';
import { createRoot } from 'react-dom/client'
import Layout from '../components/common/Layout/Layout';
import Reporting from '../components/Reporting';

if (document.getElementById('reporting')){
    // createRoot(<App/>, document.getElementById('app')) 
    createRoot(document.getElementById('reporting')).render(<Layout><Reporting/></Layout>)
}