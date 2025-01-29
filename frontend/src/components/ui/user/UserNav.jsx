import axios from 'axios';
import React from 'react';

const UserNav = ({ user }) => {
    const profileImage = user?.picture || '/default-user.png';
    console.log(profileImage); // Fallback image
    const handleLogout = async () => {
        try {
          await axios.get(`${import.meta.env.VITE_BACKEND}/auth/logout`, {
            withCredentials: true,
          });
          window.location.href = "/"; // or redirect to your desired page after logout
        } catch (error) {
          console.error("Logout error:", error);
        }
      };
      
    return (
        <div className="user-nav">
            <div>

            <img 
                src={profileImage} 
                referrerPolicy='no-referrer'
                alt={user?.name || 'User'} 
                className="profile-image" 
                />
            <span className="user-name" style={{ marginLeft: '10px' }}>
                {user?.name || 'Guest'}
            </span>
                </div>
            <div>
                <button onClick={handleLogout}>logout</button>
            </div>
        </div>
    );
};

export default UserNav;
