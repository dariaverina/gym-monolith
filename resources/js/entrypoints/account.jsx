import '../bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client'
import Layout from '../components/common/Layout/Layout';
import Account from '../components/Account';

if (document.getElementById('account')){
    createRoot(document.getElementById('account')).render(<Layout><Account/></Layout>)
}