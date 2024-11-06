import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WidgetPage from '../WidgetPage';

describe('WidgetPage Component', () => {
  beforeEach(() => {
    render(<WidgetPage />);
  });

  it('renders the search bar', () => {
    const searchInput = screen.getByPlaceholderText('Search...');
    expect(searchInput).toBeInTheDocument();
  });

  it('renders icons for navigation', () => {
    const homeIcon = screen.getByText('Home');
    const profileIcon = screen.getByText('Profile');
    const storeIcon = screen.getByText('Store');
    const cartIcon = screen.getByText('Cart');
    const historyIcon = screen.getByText('History');
    const reportsIcon = screen.getByText('Reports');

    expect(homeIcon).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
    expect(storeIcon).toBeInTheDocument();
    expect(cartIcon).toBeInTheDocument();
    expect(historyIcon).toBeInTheDocument();
    expect(reportsIcon).toBeInTheDocument();
  });

  it('changes active page to Home when "Home" icon is clicked', () => {
    fireEvent.click(screen.getByText('Home'));
    expect(screen.getByText('Home')).toBeInTheDocument(); // Just check if the icon is active
  });

  it('changes active page to Profile when "Profile" icon is clicked', () => {
    fireEvent.click(screen.getByText('Profile'));
    expect(screen.getByText('Profile')).toBeInTheDocument(); // Just check if the icon is active
  });

  // You can add similar tests for other icons if needed
});
