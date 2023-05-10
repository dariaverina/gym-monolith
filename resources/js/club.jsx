import './bootstrap';
import { createRoot } from 'react-dom/client'
import Layout from './components/common/Layout/Layout';
import Club from './components/Club';
import { BrowserRouter, Route, Routes,Router } from 'react-router-dom';

if (document.getElementById('club')){
    // createRoot(<App/>, document.getElementById('app')) 
    createRoot(document.getElementById('club')).render(
        <BrowserRouter>
          <Routes>
            <Route path="/clubs/:clubName" element={<Layout><Club/></Layout>} />
          </Routes>
        </BrowserRouter>
      )
}