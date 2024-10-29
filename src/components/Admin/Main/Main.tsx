import React from 'react'
import Header from '../Header/Header';
import { Route,  Routes } from 'react-router-dom';
import Analysis from '../../../pages/admin/Analysis/Analysis';
import User from '../../../pages/admin/User/User';
import Manga from '../../../pages/admin/Manga/Manga';
import Chapter from '../../../pages/admin/Chapter/Chapter';
import ImageManager from '../../../pages/admin/Image/Image';





const MainContent = ({ isOpen, toggleDarkMode, darkMode }: {isOpen: boolean, toggleDarkMode: () => void, darkMode: boolean}) => {
  return (
      <div
          className={`min-h-screen flex-1 bg-slate-200 ${isOpen ? "md:ml-44" : "ml-16"} transition-all duration-300 dark:bg-slate-800`}
      >
          <div className={`text-${darkMode ? 'white' : 'black'}`}>
          <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
              <Routes>
                  <Route path='Analyst' element={<Analysis />} />
                  <Route path='User' element={<User />} />
                  <Route path='Manga' element={<Manga />} />
                  <Route path='Chapter' element={<Chapter />} />
                  <Route path='Settings' element={<ImageManager />} />
              </Routes>
          </div>
      </div>
  );
};
export default MainContent;
