import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App'; // Adjust the import based on your structure
import userEvent from '@testing-library/user-event';

jest.mock('./supabaseClient', () => ({
  supabase: {
    auth: {
      onAuthStateChange: jest.fn(() => ({
        data: { subscription: { unsubscribe: jest.fn() } },
      })),
    },
  },
}));

describe('App Component', () => {
  it('renders the login form by default', () => {
    render(<App />); // No need for Router here

    // Check for the text that is present in your LoginForm component
    expect(screen.getByText(/login/i)).toBeInTheDocument(); // Adjust based on your LoginForm content
  });

  it('navigates to the sign-up page', async () => {
    render(<App />); // No need for Router here

    // Simulate clicking on the sign-up link/button
    userEvent.click(screen.getByText(/sign up/i)); // Adjust to match the text of your sign-up button

    // After clicking, check if the SignUpForm is rendered
    expect(await screen.findByText(/sign up/i)).toBeInTheDocument(); // Adjust based on your SignUpForm content
  });

  // Additional tests for other routes/pages can go here
});
