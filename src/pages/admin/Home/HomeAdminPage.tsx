import LeftAdmin from "../../../components/Admin/Left/LeftAdmin";
import { useState } from 'react';
import DefaultLayoutAdmin from "../../../layouts/DefaultLayoutAdmin/DefaultLayoutAdmin";
import Manga from "../Manga/Manga";


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
    const [selectedItem, setSelectedItem] = useState<string | null>(null);  
    
    return (
        <DefaultLayoutAdmin>
            a
            {/* <LeftAdmin onSelect={setSelectedItem} />
            <Form selectItem={selectedItem} /> */}
        </DefaultLayoutAdmin>
    );
}

export default AdminHome;
