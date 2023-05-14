import '../bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client'
import Layout from '../components/common/Layout/Layout';
import Trainers from '../components/Trainers';


if (document.getElementById('trainers')){
    createRoot(document.getElementById('trainers')).render(<Layout><Trainers/></Layout>)
}