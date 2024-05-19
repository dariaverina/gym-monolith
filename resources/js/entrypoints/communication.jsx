import '../bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client'
import Layout from '../components/common/Layout/Layout';
import Communication from '../components/Communication';

if (document.getElementById('communication')){
    createRoot(document.getElementById('communication')).render(<Layout><Communication/></Layout>)
}