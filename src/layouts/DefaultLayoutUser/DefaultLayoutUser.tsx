import { ReactNode } from 'react';
import Header from '../../components/User/Header/Header';
import BreadCrumb from '../../components/User/Common/BreadCrumb';
import Footer from '../../components/User/Footer/Footer';

interface DefaultLayoutUserProps {
  children: ReactNode;  
}

const DefaultLayoutUser = ({ children }: DefaultLayoutUserProps) => {
  return (
    <div className='bg-zinc-900'>
      <Header />
      <div className="container mx-auto h-full my-10">
        <BreadCrumb />
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default DefaultLayoutUser;
