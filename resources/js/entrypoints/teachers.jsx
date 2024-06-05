import '../bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client'
import Layout from '../components/common/Layout/Layout';
import TeachersList from '../components/manager/Dashboard/Users/UsersList/TeachersList';

if (document.getElementById('teachers')){
    createRoot(document.getElementById('teachers')).render(<Layout><TeachersList/></Layout>)
}