import React from "react";
import { supabase } from "../lib/supabase";

interface UserProfileProps {
  user: any;
  onLogout: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onLogout }) => {
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      onLogout();
    } catch (error: any) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div className="user-profile">
      <div className="user-info">
        <div className="user-avatar">
          {user.user_metadata?.avatar_url ? (
            <img
              src={user.user_metadata.avatar_url}
              alt="Profile"
              className="avatar-image"
            />
          ) : (
            <div className="avatar-placeholder">
              {user.email?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="user-details">
          <h3 className="user-name">
            {user.user_metadata?.full_name || user.email}
          </h3>
          <p className="user-email">{user.email}</p>
        </div>
      </div>
      <button onClick={handleLogout} className="logout-button">
        Sign Out
      </button>
    </div>
  );
};

export default UserProfile;
