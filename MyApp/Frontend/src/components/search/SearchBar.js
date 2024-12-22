import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { debounce } from 'lodash';
import { recipeService } from '../../services/recipeService';
import SearchResults from './SearchResults';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchResults = debounce(async (searchQuery) => {
    if (searchQuery.length < 3) {
      setResults([]);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const data = await recipeService.searchRecipes(searchQuery);
      setResults(Array.isArray(data) ? data : []);
    } catch (error) {
      setError('Failed to fetch recipes. Please try again.');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, 300);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowDropdown(true);
    fetchResults(value);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search recipes by name or cuisine..."
          className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onFocus={() => query.length >= 3 && setShowDropdown(true)}
        />
        <Search 
          className="absolute left-3 top-3.5 text-gray-400" 
          size={20}
        />
      </div>

      {showDropdown && (query.length >= 3) && (
        <div className="absolute w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {error ? (
            <div className="p-4 text-red-500 text-center">{error}</div>
          ) : (
            <SearchResults 
              results={results} 
              isLoading={isLoading} 
              onSelect={() => setShowDropdown(false)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;