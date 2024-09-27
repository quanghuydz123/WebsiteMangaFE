import HeaderAdmin from '../../components/Admin/Header/HeaderAdmin';
import './DefaultLayoutAdmin.css';
import { ReactNode } from 'react';

interface DefaultLayoutAdminProps {
  children: ReactNode;  
}

const DefaultLayoutAdmin = ({ children }: DefaultLayoutAdminProps) => {
  return (
    <div>
      <HeaderAdmin />
      <div className="container-admin" >
        {children}
      </div>
    </div>
  );
}

export default DefaultLayoutAdmin;
