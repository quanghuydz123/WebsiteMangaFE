import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { 
  HomeAdminPage,
  MangaDetailPage,
  MangaListPage,
} from './pages/index';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to="/home" />} />
      <Route path='/home' element={<MangaListPage />} />
      <Route path='/genres/:genreId' element={<MangaListPage />} />
      <Route path='/manga/:id' element={<MangaDetailPage />} />
      <Route path='/admin/*' element={<HomeAdminPage />} />
      {/* Thêm một trang 404 */}
      <Route path='*' element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
}

export default App;
