import { ReactNode } from 'react';
import Header from '../../components/User/Header/Header';

interface DefaultLayoutUserProps {
  children: ReactNode;  
}

const DefaultLayoutUser = ({ children }: DefaultLayoutUserProps) => {
  return (
    <div className='bg-zinc-900'>
      <Header />
      <div className="container">
        {children}
      </div>
    </div>
  );
}

export default DefaultLayoutUser;
