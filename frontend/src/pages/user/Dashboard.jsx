import axios from 'axios'
import React, { useEffect } from 'react'

const Dashboard = () => {
    const getUser = async()=>{
        try {
            const res =await axios.get(`${import.meta.env.VITE_BACKEND}/auth/user`,{
                withCredentials : true
            });
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getUser()
    },[])
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard