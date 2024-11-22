
import { useEffect, useState } from 'react';
import MainContent from '../../../components/Admin/Main/Main';
import Sidebar from '../../../components/Admin/Sidebar/Sidebar';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';



const AdminHome = () => {

    const { role } = useAuth();

    const [darkMode, setDarkMode]= useState(true);

    const [isOpen, setIsOpen] = useState(true);

    const nav = useNavigate();

    const toggleDarkMode = ()=>{
        setDarkMode(!darkMode);
    }
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const savedRole = role || localStorage.getItem('role'); // Lấy role từ localStorage nếu cần
        if (!savedRole || savedRole.slice(savedRole.length - 2) !== "ff") {
            nav('/');
        }
    }, [role]);

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
