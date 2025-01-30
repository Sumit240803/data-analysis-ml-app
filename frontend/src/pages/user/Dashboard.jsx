import axios from 'axios';
import React, { useEffect, useState } from 'react';
import UserNav from '../../components/ui/user/UserNav';
import "../css/Dashboard.css";
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    file: null,
    description: '',
  });

  const getUser = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND}/auth/user`, {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('file', formData.file);
    formDataToSend.append('description', formData.description);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND}/create-environment`,
        formDataToSend,
        { withCredentials: true }
      );
      console.log('Environment Created', response.data);
    } catch (error) {
      console.log('Error creating environment:', error);
    }
  };

  if (!user) {
    return <div>Loading....</div>;
  }

  return (
    <div className='dashboard-container'>
      <div>
        <UserNav user={user} />
      </div>
      <main className="main">
        <div className="card">
          <h1>Create Your Environment</h1>
          <p>To start your analysis, you need to create an environment first.</p>
          {/* Form for creating environment */}
          <form onSubmit={handleSubmit} className="create-environment-form">
            <div className="form-group">
              <label htmlFor="name">Environment Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                required
              />
            </div>
            <button type="submit">Create Environment</button>
          </form>
        </div>
        <div className="card">
          <h1>View Environment</h1>
          <p>You can see your created environments here.</p>
        </div>
        <div className="card">
          <h1>Check Your Progress</h1>
          <p>Your overall progress of created environments.</p>
        </div>
      </main>

     

      <h1 className="section-title">Helpful Links</h1>
      <section className="links-section">
        <Link to="/blogs" className="link-card">
          Blogs
        </Link>
      </section>
    </div>
  );
};

export default Dashboard;
