import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserNav from '../../components/ui/user/UserNav';
import axios from 'axios';

const Env = () => {
  const { envId } = useParams();
  const [user, setUser] = useState(null);
  const [env, setEnv] = useState(null);
  const [error, setError] = useState(null);

  const getEnv = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/user/env-id`,
        { envId },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.data.env) {
        setEnv(res.data.env);
      } else {
        setError("Environment not found");
      }
    } catch (error) {
      setError('Error fetching environment data');
      console.error('Error:', error);
    }
  };

  const getUser = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND}/auth/user`, {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (error) {
      setError('Error fetching user data');
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    getUser();
    if (envId) getEnv(); // Only fetch the environment if envId exists
  }, [envId]);

  if (!user) {
    return <div>Loading....</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <UserNav user={user} />
      {env ? (
        <div>
          <h1>{env.name}</h1>
          <p>{env.description}</p>
        </div>
      ) : (
        <p>Loading environment data...</p>
      )}
      <div className='services'>
        <div className='service-1'>
            <h2>Data Cleaning</h2>
            <p>Includes</p>
            <ul>
                <li>Handling Null Values</li>
                <li>Dropping Columns</li>
                <li>Handling Outliers</li>
            </ul>
        </div>
        <div className='service-2'>
            <h2>Data Processing</h2>
            <p>Includes</p>
            <ul>
                <li>Data Normalization</li>
                <li>Data Fitting - Min-Max Scaling and Feature Scaling</li>
            </ul>
        </div>
        <div className='service-3'>
            <h2>Data Visualisation</h2>
            <p>Include</p>
            <ul>
                <li>Charts - Line Chart and Pie Chart</li>
                <li>Scatter Plot</li>
                <li>Box Plot</li>
            </ul>
        </div>
      </div>
    </div>
  );
};

export default Env;
