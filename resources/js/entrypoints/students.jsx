import '../bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client'
import Layout from '../components/common/Layout/Layout';
import UsersList from '../components/manager/Dashboard/Users/UsersList/UsersList';

if (document.getElementById('students')){
    createRoot(document.getElementById('students')).render(<Layout><UsersList/></Layout>)
}