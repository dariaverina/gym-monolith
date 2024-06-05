import '../bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client'
import Layout from '../components/common/Layout/Layout';
import WorkersList from '../components/manager/Dashboard/Users/UsersList/WorkersList';

if (document.getElementById('workers')){
    createRoot(document.getElementById('workers')).render(<Layout><WorkersList/></Layout>)
}