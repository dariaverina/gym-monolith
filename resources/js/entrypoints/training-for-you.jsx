import '../bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client'
import Layout from '../components/common/Layout/Layout';
import Trainers from '../components/Trainers';
import TrainingSelection from '../components/TrainingSelection';


if (document.getElementById('training-for-you')){
    createRoot(document.getElementById('training-for-you')).render(<Layout><TrainingSelection/></Layout>)
}