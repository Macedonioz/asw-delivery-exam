import { useState } from 'react';
import styles from './SearchBar.module.css';

function SearchBar({ onSearch }) {
    const [term, setTerm] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();             // prevent default HTML form submission (on page reload)
        onSearch(term.trim());
    };

    return (
        <form className={styles.searchBar} onSubmit={handleSubmit}>
            <input
                className={styles.input}
                type="text" 
                placeholder="Search by name..." 
                value={term}
                onChange={(e) => setTerm(e.target.value)}
            />
            <button className={styles.button} type="submit">Search</button>
        </form>
    );
}

export default SearchBar;