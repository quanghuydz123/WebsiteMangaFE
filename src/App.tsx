import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomeAdminPage from './pages/admin/Home/HomeAdminPage';
import HomeUserPage from './pages/user/UserHomePage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomeUserPage />} />
      <Route path='/admin' element={<HomeAdminPage />} />
      {/* Thêm một trang 404 */}
      <Route path='*' element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
}

export default App;
