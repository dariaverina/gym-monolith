import '../bootstrap';
import React from 'react';
import ReactDOM  from 'react-dom';
import { createRoot } from 'react-dom/client'
import Layout from '../components/common/Layout/Layout';


if (document.getElementById('help')){
    createRoot(document.getElementById('help')).render(<Layout>help me</Layout>)
}