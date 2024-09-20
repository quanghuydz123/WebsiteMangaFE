import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeAdminPage from './pages/admin/Home/HomeAdminPage';
import HomeUserPage from './pages/user/HomeUserPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeUserPage />} />
        <Route path='/admin' element={<HomeAdminPage />} />
        {/* Add a 404 page */}
        <Route path='*' element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
