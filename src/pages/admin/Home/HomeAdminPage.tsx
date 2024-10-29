import LeftAdmin from "../../../components/Admin/Left/LeftAdmin";
import { useState } from 'react';
import DefaultLayoutAdmin from "../../../layouts/DefaultLayoutAdmin/DefaultLayoutAdmin";


interface FormProps {
  selectItem: string | null;  
}

const breadCrumbItems = [
    { label: 'Trang chủ', href: '/', icon: <i className="fa-solid fa-house"></i> },
];

const Form = ({ selectItem }: FormProps) => {
    let form;

    switch (selectItem) {
        case "Quản lý khách hàng":
            // form = <ManageUser />;
            break;
        case "Quản lý truyện":
            // form = <ManageBook />;
            break;
        case "Quản lý thể loại":
            // form = <ManageGenre />;
            break;
        case "Theo dõi doanh thu":
            // form = <DashBoard />;
            break;
        default:
            // form = <ManageBook />;
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
            <LeftAdmin onSelect={setSelectedItem} />
            <Form selectItem={selectedItem} />
        </DefaultLayoutAdmin>
    );
}

export default AdminHome;
