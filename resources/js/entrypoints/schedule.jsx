import '../bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client'
import Layout from '../components/common/Layout/Layout';
import Schedule from '../components/Schedule';


if (document.getElementById('schedule')){
    createRoot(document.getElementById('schedule')).render(<div className='bg-gray-900'><Layout><Schedule/></Layout></div>)
}