import axios from 'axios'
import React, { useEffect, useState } from 'react'
import UserNav from '../../components/ui/user/UserNav';
import "../css/Dashboard.css"
import { Link } from 'react-router-dom';
const Dashboard = () => {
    const [user , setUser] = useState(null);
    const getUser = async()=>{
        try {
            const res =await axios.get(`${import.meta.env.VITE_BACKEND}/auth/user`,{
                withCredentials : true
            });
            
            setUser(res.data);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getUser()
    },[])
    if(!user){
        return <div>Loading....</div>
    }
  return (
    <div>
        <div>
        <UserNav user={user}/>
        </div>
        <main className='main'>
        <Link to="/create-environment" className="card">
        <h1>Create Your Environment</h1>
        <p>To start your analysis, you need to create an environment first.</p>
      </Link>
      <Link to="/view-environment" className="card">
        <h1>View Environment</h1>
        <p>You can see your created environments here.</p>
      </Link>
      <Link to="/progress" className="card">
        <h1>Check Your Progress</h1>
        <p>Your overall progress of created environments.</p>
      </Link>
</main>

    </div>
  )
}

export default Dashboard