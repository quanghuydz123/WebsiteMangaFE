
import { useState } from 'react';
import Manga from "../Manga/Manga";
import MainContent from '../../../components/Admin/Main/Main';
import Sidebar from '../../../components/Admin/Sidebar/Sidebar';
import Pagination from '../../../components/Admin/Pagination/Pagination';



const AdminHome = () => {
    const [darkMode, setDarkMode]= useState(true);
    const [isOpen, setIsOpen] = useState(true);

    const toggleDarkMode = ()=>{
        setDarkMode(!darkMode);
    }
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`flex font-Montserrat bg-slate-700 ${darkMode ? "dark" : ""}`}>
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} setIsOpen={setIsOpen} />
        <MainContent 
            isOpen={isOpen} 
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode} 
           
            />

        </div>
    );
}

export default AdminHome;
