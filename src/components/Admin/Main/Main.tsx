import React from 'react'
import Header from '../Header/Header';
import Card from '../Cards/Card';
import CustomBarChart from '../Charts/CustomBarChart';
import CustomPieChart from '../Charts/CustomPieChart';
import Table from '../Table/Table';
import Activity from '../Activity/Activity';
import {motion} from "framer-motion";
import { Route, Router, Routes } from 'react-router-dom';
import Analysis from '../../../pages/admin/Analysis/Analysis';
import User from '../../../pages/admin/User/User';
import Manga from '../../../pages/admin/Manga/Manga';
import Chapter from '../../../pages/admin/Chapter/Chapter';




const MainContent = ({ isOpen, toggleDarkMode, darkMode }: {isOpen: boolean, toggleDarkMode: () => void, darkMode:boolean}) => {
  return (
    <div
        className={`flex-1 bg-slate-200 ${
          isOpen ? "md:ml-44" : "ml-16"
        } transition-all duration-300 dark:bg-slate-800`}
    >
      <Header darkMode= {darkMode} toggleDarkMode={toggleDarkMode} />
      <Routes>
        <Route path='Analyst' element={<Analysis/>}/>
        <Route path='User' element={<User/>}/>
        <Route path='Manga' element={<Manga/>}/>
        <Route path='Chapter' element={<Chapter/>}/>
      </Routes>
    </div>
  );
};

export default MainContent;