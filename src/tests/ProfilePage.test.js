import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProfilePage from '../ProfilePage'; // Adjust the path according to your file structure
import { supabase } from '../supabaseClient'; // Adjust the path according to your file structure
import { MemoryRouter } from 'react-router-dom';

// Mock supabase client
jest.mock('../supabaseClient');

describe('UserProfile', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  test('fetches and displays user profile data on load', async () => {
    const mockUser = { id: 'user-id' };
    const mockProfileData = {
      fname: 'John',
      lname: 'Doe',
      store_name: 'Test Store',
      avatar: '',
      gender: 'Male',
      region: 'Test Region',
      city: 'Test City',
      village: 'Test Village',
      street_num: '123',
    };

    supabase.auth.getUser.mockResolvedValue({ data: mockUser });
    supabase.from.mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({ data: mockProfileData, error: null }),
        }),
      }),
    });

    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText(/User Profile/i)).toBeInTheDocument());
    expect(screen.getByLabelText(/First Name/i)).toHaveValue(mockProfileData.fname);
    expect(screen.getByLabelText(/Last Name/i)).toHaveValue(mockProfileData.lname);
    expect(screen.getByLabelText(/Store Name/i)).toHaveValue(mockProfileData.store_name);
  });

  test('updates user profile when update button is clicked', async () => {
    const mockUser = { id: 'user-id' };
    const mockProfileData = {}; // Empty initially, since we're testing the update

    supabase.auth.getUser.mockResolvedValue({ data: mockUser });
    supabase.from.mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({ data: mockProfileData, error: null }),
        }),
      }),
      upsert: jest.fn().mockResolvedValue({ error: null }),
    });

    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );
    
    await waitFor(() => expect(screen.getByText(/User Profile/i)).toBeInTheDocument());

    // Simulate profile update form inputs
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Store Name/i), { target: { value: 'Updated Store' } });

    // Click update button
    fireEvent.click(screen.getByRole('button', { name: /update profile/i }));

    // Assert upsert call with correct arguments
    await waitFor(() => {
      expect(supabase.from().upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          fname: 'Jane',
          lname: 'Doe',
          store_name: 'Updated Store',
          auth_id: 'user-id',
        }),
        { onConflict: ['auth_id'] }
      );
    });
  });

  test('uploads avatar and updates profile with new avatar URL', async () => {
    const mockUser = { id: 'user-id' };
    const mockProfileData = {
      fname: 'John',
      lname: 'Doe',
      store_name: 'Test Store',
      avatar: 'old-avatar-url',
      gender: 'Male',
      region: 'Test Region',
      city: 'Test City',
      village: 'Test Village',
      street_num: '123',
    };

    supabase.auth.getUser.mockResolvedValue({ data: mockUser });
    supabase.from.mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({ data: mockProfileData, error: null }),
        }),
      }),
      upsert: jest.fn().mockResolvedValue({ error: null }),
    });

    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText(/User Profile/i)).toBeInTheDocument());

    // Simulate avatar upload
    const newAvatarUrl = 'new-avatar-url';
    // Assuming you have a method to handle avatar upload
    fireEvent.change(screen.getByLabelText(/Upload Avatar/i), { target: { files: [new File([], newAvatarUrl)] } });

    // Simulate update profile
    fireEvent.click(screen.getByRole('button', { name: /update profile/i }));

    // Assert upsert call with new avatar URL
    await waitFor(() => {
      expect(supabase.from().upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          avatar: newAvatarUrl,
          auth_id: 'user-id',
        }),
        { onConflict: ['auth_id'] }
      );
    });
  });
});
