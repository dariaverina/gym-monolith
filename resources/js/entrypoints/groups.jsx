import '../bootstrap';
import React from 'react';
import ReactDOM  from 'react-dom';
import { createRoot } from 'react-dom/client'
import Layout from '../components/common/Layout/Layout';
import GroupList from '../components/manager/Dashboard/Groups/GroupList';


if (document.getElementById('groups')){
    createRoot(document.getElementById('groups')).render(<Layout>
            <GroupList />
    </Layout>)
}