import React from 'react'
import Header from '../Header/Header';
import Card from '../Cards/Card';
import CustomBarChart from '../Charts/CustomBarChart';
import CustomPieChart from '../Charts/CustomPieChart';
import Table from '../Table/Table';
import Activity from '../Activity/Activity';
import {motion} from "framer-motion";


const containerVariants = {
  hidden: { opacity: 0, scale:0.9},
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type:"string",
      stiffness: 80,
      damping: 20,
      staggerChildren: 0.3,
    },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y:0,
    transition: {
      duration: 0.5,
      ease:"easeOut",
    },
  },
};

const MainContent = ({ isOpen, toggleDarkMode, darkMode }: {isOpen: any, toggleDarkMode: any, darkMode:any}) => {
  return (
    <div
        className={`flex-1 bg-slate-200 ${
          isOpen ? "md:ml-44" : "ml-16"
        } transition-all duration-300 dark:bg-slate-800`}
    >
      <Header darkMode= {darkMode} toggleDarkMode={toggleDarkMode} />
      <Card/>
      <motion.div className="translate-all flex flex-col gap-4 p-4 
      duration-300 sm:px-7 sm:py-1 xl:flex-row"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CustomBarChart variants={itemVariants}/>
        <CustomPieChart variants={itemVariants}/>
      </motion.div>
      <motion.div className="translate-all flex flex-col gap-4 p-4 
      duration-300 sm:px-7 sm:py-1 xl:flex-row"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Table variants={itemVariants}/>
        <Activity variants={itemVariants}/>
      </motion.div>
    </div>
  );
};

export default MainContent;
