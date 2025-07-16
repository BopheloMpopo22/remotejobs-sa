import React, { useRef, useState } from "react";
import { supabase } from "../lib/supabase";

interface UserProfileProps {
  user: any;
  onLogout: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  // Handle clicking outside to close dropdown
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        avatarRef.current &&
        !avatarRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      onLogout();
    } catch (error: any) {
      console.error("Error logging out:", error.message);
    }
  };

  const handleAvatarClick = () => {
    setDropdownOpen((open) => !open);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSavePicture = async () => {
    if (!file) return;
    setUploading(true);
    try {
      // Upload to Supabase Storage (bucket: 'avatars')
      const fileExt = file.name.split(".").pop();
      const filePath = `avatars/${user.id}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });
      if (uploadError) throw uploadError;
      // Get public URL
      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
      // Update user profile
      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: data.publicUrl },
      });
      if (updateError) throw updateError;
      setPreview(null);
      setFile(null);
      setDropdownOpen(false);
      window.location.reload(); // Refresh to show new avatar
    } catch (error: any) {
      alert("Failed to update profile picture: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className="user-profile"
      ref={avatarRef}
      style={{ position: "relative" }}
    >
      <div
        className="user-avatar"
        style={{ cursor: "pointer" }}
        onClick={handleAvatarClick}
        title="Profile menu"
      >
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
      {dropdownOpen && (
        <div
          className="profile-dropdown"
          style={{
            position: "absolute",
            top: "110%",
            right: 0,
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            minWidth: 180,
            zIndex: 100,
            padding: 12,
          }}
        >
          <div style={{ padding: 8, borderBottom: "1px solid #f3f4f6" }}>
            <div style={{ fontWeight: 600 }}>
              {user.user_metadata?.full_name || user.email}
            </div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>{user.email}</div>
          </div>
          <button
            style={{
              width: "100%",
              background: "none",
              border: "none",
              textAlign: "left",
              padding: "10px 8px",
              cursor: "pointer",
              fontSize: 15,
            }}
            onClick={() => {
              document.getElementById("profile-upload-input")?.click();
            }}
            disabled={uploading}
          >
            Change Profile Picture
          </button>
          <input
            id="profile-upload-input"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          {preview && (
            <div style={{ padding: 8 }}>
              <img
                src={preview}
                alt="Preview"
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: 8,
                }}
              />
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={handleSavePicture}
                  disabled={uploading}
                  style={{
                    background: "#10b981",
                    color: "white",
                    border: "none",
                    borderRadius: 4,
                    padding: "4px 10px",
                    fontWeight: 600,
                  }}
                >
                  {uploading ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={() => {
                    setPreview(null);
                    setFile(null);
                  }}
                  disabled={uploading}
                  style={{
                    background: "#f3f4f6",
                    color: "#374151",
                    border: "none",
                    borderRadius: 4,
                    padding: "4px 10px",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          <button
            style={{
              width: "100%",
              background: "none",
              border: "none",
              textAlign: "left",
              padding: "10px 8px",
              color: "#dc2626",
              cursor: "pointer",
              fontSize: 15,
              fontWeight: 600,
            }}
            onClick={handleLogout}
            disabled={uploading}
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
