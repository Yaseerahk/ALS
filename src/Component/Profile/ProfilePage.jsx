// src/components/Profile/ProfilePage.jsx
import React from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
  return (
    <div className="profile-container">

      {/* profile header section */}
      <div className="profile-header">
        <div className="profile-info">
          <h2>Name of User</h2>
          <p>Type of user</p>
          <button className="edit-button">Edit Goals</button>
        </div>
      </div>
      
      <div className="profile-content">
        <div className="progress-section">
          <h3>Progress</h3>
          {/* show learning status + topics */}
          <ul className="progress-list">
            <li>☑ Topic 1</li>
            <li>☑ Topic 2</li>
            <li>☐ Topic 3</li>
            <li>☐ Topic 4</li>
          </ul>
        </div>
        
        <div className="badges-section">
          <h3>Badges Earned</h3>
          <div className="badges-grid">
            <div className="badge-item">Badge 1</div>
            <div className="badge-item">Badge 2</div>
            <div className="badge-item">Badge 3</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;