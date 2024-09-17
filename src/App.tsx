import React from 'react';
import './App.css';
import userAPI from './apis/userApi';
import { HomeAdminPage, HomeUserPage } from './pages';
import { Route, Routes } from 'react-router-dom';

function App() {
  // const handleCallApi = async ()=>{
  //   const api = '/get-all'
  //   try {
  //     const res = await userAPI.HandleUser(api)
  //     console.log("res",res)
  //   } catch (error:any) {
  //     const errorMessage = JSON.parse(error.message)
  //     console.log("HomeScreen", errorMessage)
  //   }
  // }

  return (
    <div>
      <Routes>
          <Route path='/' element={<HomeUserPage />}/>
          <Route path='/admin' element={<HomeAdminPage />}/>
        </Routes>
    </div>
  );
}

export default App;
