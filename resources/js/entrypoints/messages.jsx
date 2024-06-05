import '../bootstrap';
import React from 'react';
import ReactDOM  from 'react-dom';
import { createRoot } from 'react-dom/client'
import Layout from '../components/common/Layout/Layout';
import MessageList from '../components/manager/Dashboard/Messages/MessageList';


if (document.getElementById('messages')){
    createRoot(document.getElementById('messages')).render(<Layout><MessageList/></Layout>)
}