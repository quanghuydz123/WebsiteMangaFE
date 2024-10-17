
import { useState } from 'react';
import Manga from "../Manga/Manga";

import MainContent from '../../../components/Admin/Main/Main';
import Sidebar from '../../../components/Admin/Sidebar/Sidebar';


interface FormProps {
  selectItem: string | null;  
}

const Form = ({ selectItem }: FormProps) => {
    let form;

    switch (selectItem) {
        case "Quản lý khách hàng":
            // form = <User />;
            break;
        case "Quản lý truyện":
            form = <Manga />;
            break;
        case "Quản lý thể loại":
            // form = <Genre />;
            break;
        case "Theo dõi doanh thu":
            // form = <DashBoard />;
            break;
        default:
             form = <Manga />;
            break;
    }

    return (
        <>
            {form}
        </>
    );
};

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
        <div className={`flex font-Montserrat bg-slate-700 ${darkMode && "dark"}`}>
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
