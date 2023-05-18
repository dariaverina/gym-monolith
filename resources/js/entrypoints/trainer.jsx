import '../bootstrap';
import { createRoot } from 'react-dom/client'
import Layout from '../components/common/Layout/Layout';
import Club from '../components/Club';
import { BrowserRouter, Route, Routes,Router } from 'react-router-dom';
import Trainer from '../components/Trainer';

if (document.getElementById('trainer')){
    createRoot(document.getElementById('trainer')).render(
        <BrowserRouter>
          <Routes>
            <Route path="/trainers/:id" element={<Layout><Trainer/></Layout>} />
          </Routes>
        </BrowserRouter>
      )
}