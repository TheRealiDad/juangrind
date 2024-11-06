// AvatarUpload.js
import React from 'react';
import { supabase } from './supabaseClient';

const AvatarUpload = ({ onUpload }) => {
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const { data, error } = await supabase.storage.from('avatars').upload(`public/${file.name}`, file, { upsert: true });
      if (error) {
        console.error('Error uploading avatar:', error);
      } else {
        const { publicURL } = supabase.storage.from('avatars').getPublicUrl(`public/${file.name}`);
        onUpload(publicURL);
      }
    }
  };

  return (
    <div>
      <label htmlFor="avatar-upload">Change Avatar</label>
      <input type="file" id="avatar-upload" onChange={handleFileChange} />
    </div>
  );
};

export default AvatarUpload;
