import React from 'react';
import './App.css';
import userAPI from './apis/userApi';

function App() {
  const handleCallApi = async ()=>{
    const api = '/get-all'
    try {
      const res = await userAPI.HandleUser(api)
      console.log("res",res)
    } catch (error:any) {
      const errorMessage = JSON.parse(error.message)
      console.log("HomeScreen", errorMessage)
    }
  }

  return (
    <div>
      <button onClick={()=>handleCallApi()}>click</button>
    </div>
  );
}

export default App;
