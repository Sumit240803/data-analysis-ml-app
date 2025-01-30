
import React from 'react';
import "./css/UserNav.css"
const UserNav = ({ user }) => {
    const profileImage = user?.picture || '/default-user.png';
    

      
    return (
      <div>
        <div className="user-nav">
           
            <div className='user-info'>
            <img 
                src={profileImage} 
                referrerPolicy='no-referrer'
                alt={user?.name || 'User'} 
                className="profile-image" 
                />
            <span className="user-name">
                {user?.name || 'Guest'}
            </span>
                </div>
            
              Settings
            </div>
           
        </div>
      
       
    );
};

export default UserNav;
