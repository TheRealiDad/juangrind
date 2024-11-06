import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, TextField, Grid, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Avatar } from '@mui/material';
import { supabase } from './supabaseClient';

const TestButtonComponent = () => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    fname: '',
    lname: '',
    gender: '',
    dob: '',
    region: '',
    city: '',
    village: '',
    house_number: '',
    avatar: '',
  });
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;

      if (user) {
        const { data, error: fetchError } = await supabase
          .from('test')
          .select('fname, lname, gender, dob, region, city, village, house_number, avatar')
          .eq('user_id', user.id)
          .single();

        if (fetchError) throw fetchError;

        if (data) {
          setProfile({
            fname: data.fname || '',
            lname: data.lname || '',
            gender: data.gender || '',
            dob: data.dob || '',
            region: data.region || '',
            city: data.city || '',
            village: data.village || '',
            house_number: data.house_number || '',
            avatar: data.avatar || '',
          });
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleAvatarChange = async (e) => {
    const newAvatarFile = e.target.files[0];
    if (!newAvatarFile) return;

    setLoading(true);
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;

      // Delete existing avatar if present
      if (profile.avatar) {
        const existingFilePath = `avatar/${user.id}/${profile.avatar.split('/').pop()}`;
        const { error: deleteError } = await supabase.storage
          .from('avatar')
          .remove([existingFilePath]);

        if (deleteError) throw deleteError;
      }

      // Upload new avatar
      const fileName = `avatar/${user.id}/${newAvatarFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from('avatar')
        .upload(fileName, newAvatarFile, { upsert: true });
      if (uploadError) throw uploadError;

      const { data: publicUrlData } = await supabase
        .storage
        .from('avatar')
        .getPublicUrl(fileName);

      if (publicUrlData) {
        const avatarUrl = publicUrlData.publicUrl;

        // Update avatar URL in database
        const { error: updateError } = await supabase
          .from('test')
          .update({ avatar: avatarUrl })
          .eq('user_id', user.id);
        
        if (updateError) throw updateError;

        setProfile((prevProfile) => ({ ...prevProfile, avatar: avatarUrl }));
        setAvatarFile(null);
        alert('Avatar successfully updated!');
      }
    } catch (error) {
      console.error('Error updating avatar:', error);
      alert('Failed to update avatar. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async () => {
    setLoading(true);
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;

      const { error: upsertError } = await supabase
        .from('test')
        .upsert({
          user_id: user.id,
          fname: profile.fname,
          lname: profile.lname,
          gender: profile.gender,
          dob: profile.dob,
          region: profile.region,
          city: profile.city,
          village: profile.village,
          house_number: profile.house_number,
        }, { onConflict: ['user_id'] });

      if (upsertError) throw upsertError;

      alert('Profile successfully updated!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5, p: 3, border: '1px solid #ccc', borderRadius: 2 }}>
      <Typography variant="h6" align="center" gutterBottom>
        JuanGrind User Information
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} align="center">
          <Avatar
            src={profile.avatar}
            alt="User Avatar"
            sx={{ width: 80, height: 80, mb: 2 }}
          />
          <Button
            variant="contained"
            component="label"
            sx={{ mt: 1 }}
          >
            {profile.avatar ? 'Change Avatar' : 'Upload Avatar'}
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </Button>
        </Grid>

        {/* Form Fields */}
        <Grid item xs={12}>
          <TextField
            label="First Name"
            name="fname"
            value={profile.fname}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Last Name"
            name="lname"
            value={profile.lname}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        
        <Grid item xs={12}>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              name="gender"
              value={profile.gender}
              onChange={handleInputChange}
              row
            >
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel value="Female" control={<Radio />} label="Female" />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Date of Birth"
            name="dob"
            value={profile.dob}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Region"
            name="region"
            value={profile.region}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            label="City"
            name="city"
            value={profile.city}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            label="Village"
            name="village"
            value={profile.village}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            label="House Number"
            name="house_number"
            value={profile.house_number}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="primary"
        onClick={handleProfileUpdate}
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? 'Saving...' : 'Save Profile'}
      </Button>
    </Box>
  );
};

export default TestButtonComponent;
