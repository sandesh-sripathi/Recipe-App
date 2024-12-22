import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchBar from '../SearchBar';

describe('SearchBar', () => {
  it('renders search input', () => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText(/search recipes/i)).toBeInTheDocument();
  });

  it('shows results after typing 3 characters', async () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(/search recipes/i);
    fireEvent.change(input, { target: { value: 'pas' } });
    
    await waitFor(() => {
      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });
  });
});