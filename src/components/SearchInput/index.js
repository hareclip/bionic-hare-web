import { useState } from 'react';

/**
 * Search input widget
 */
export default function SearchInput() {

  const [searchInput, setSearchInput] = useState('');

  return (
    <div>
      <input
        className="border-2 rounded p-1 text-black"
        onInput={e => setSearchInput(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            // TODO: find a better way to do this with router
            window.location.href = `/search/?searchTerm=${encodeURIComponent(searchInput)}`;
          }
        }}
      />
      <button
        className="ml-3 rounded bg-gray-300 text-black p-2"
        onClick={() => {
          window.location.href = `/search/?searchTerm=${encodeURIComponent(searchInput)}`;
        }}>Search</button>
    </div>
  );

}