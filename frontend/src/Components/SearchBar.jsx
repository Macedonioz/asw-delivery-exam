import React, { useState } from 'react';

function SearchBar({ onSearch }) {
    const [term, setTerm] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();             // prevent default HTML form submission (on page reload)
        onSearch(term.trim());
    };

    return (
        <form className="search-bar" onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
            <input 
                type="text" 
                placeholder="Search by name..." 
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                style={{ flex: 1, padding: '8px' }}
            />
            <button type="submit">Search</button>
        </form>
    );
}

export default SearchBar;