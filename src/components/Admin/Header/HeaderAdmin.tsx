import React from 'react';
import logo from '../../../assets/images/logo.png';
import './HeaderAdmin.css';
import logoAdmin from '../../../assets/images/account.png';


interface User {
  avatar: string;
  displayName: string;
}

function HeaderAdmin() {

  const storedUser = localStorage.getItem('user');
  const user: User | null = storedUser ? JSON.parse(storedUser) : null;


  const handleOut = () => {
    window.location.href = '/login';
  };


  const handleBack = () => {
    window.location.href = '/';
  };

  return (
    <nav className="w-full fixed top-0 left-0 bg-[#283257] z-[1000] p-4 flex justify-between items-center">
  <div className="flex items-center cursor-pointer" onClick={handleBack}>
    <img src={logo} alt="Logo" className="w-32 h-14" />
    <div className="ml-4">
      <span className="text-lg font-bold text-white italic">Admin</span>
    </div>
  </div>

  <div className="flex items-center">
    <div className="flex items-center mr-6">
      {user ? (
        <>
          <img src={user.avatar} alt="user" className="w-10 h-10 rounded-full mr-2" />
          <span className="text-lg font-bold text-white">{user.displayName}</span>
        </>
      ) : (
        <span className="text-lg text-white">No User</span>
      )}
    </div>
    <button
      className="bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition duration-200"
      onClick={handleOut}
    >
      Logout
    </button>
  </div>
</nav>

  );
}

export default HeaderAdmin;
