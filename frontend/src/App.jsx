import React, { useEffect, useState, useCallback } from 'react'
import SearchBar from './Components/SearchBar/SearchBar.jsx';
import CountryTable from './Components/CountryTable/CountryTable.jsx';
import CountryForm from './Components/CountryForm/CountryForm.jsx';
import styles from './App.module.css';

const API_URL = "http://localhost:8080/api/countries"           // TODO change to backend container name (use env var)

function App() {
    const [countries, setCountries] = useState([]);
    const [view, setView] = useState('list');
    const [selectedCountry, setSelectedCountry] = useState(null);

    // useCallback prevents re-fetching when App re-renders for other state changes
    const fetchCountries = useCallback(async (name = "") => {
        const url = name ? `${API_URL}/search?name=${name}` : API_URL;
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            
            const data = await res.json();
            setCountries(data);
        } catch (err) {
            console.error("API error:", err);
        }
    }, []);

    useEffect(() => { 
        fetchCountries(); 
    }, [fetchCountries]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this country? This action cannot be undone.")) {
            try {
                const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
                if (res.ok) {
                    setCountries(prev => prev.filter(c => c.id !== id));        // Optimistic UI update
                }
            } catch (err) {
                console.error("Delete error:", err);
            }
        }
    };

    const handleAdd = () => {
        setSelectedCountry(null);
        setView('form');
    };

    const openEditForm = (country) => {
        setSelectedCountry(country);
        setView('form');
    };

    const handleFormSubmit = () => {
        setView('list');
        fetchCountries();
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h2>Countries CRUD</h2>
            </header>

            {/* Conditional rendering based on 'view' state */}
            {view === 'list' ? (
                <>
                    <nav className={styles.nav}>
                        <button className={styles.addButton} onClick={handleAdd}>Add</button>
                    </nav>
                    <SearchBar onSearch={fetchCountries} />
                    <CountryTable 
                        data={countries} 
                        onEdit={openEditForm} 
                        onDelete={handleDelete} 
                    />
                </>
            ) : (
                <CountryForm 
                    initialData={selectedCountry} 
                    onSaved={handleFormSubmit} 
                    onCancel={() => setView('list')}
                />
            )}
        </div>
    );
}

export default App