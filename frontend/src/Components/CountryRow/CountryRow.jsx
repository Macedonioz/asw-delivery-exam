import React, { useState } from 'react';
import styles from './CountryRow.module.css';

function CountryRow({ country, onEdit, onDelete }) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Normalizes data for display to handle missing or malformed API fields
    const display = {
        name: country.name?.trim() || 'Unknown',
        region: country.region?.trim() || 'N/A',
        capital: country.capital?.trim() || 'N/A',
        subregion: country.subregion?.trim() || 'N/A',
        demonym: country.demonym?.trim() || 'N/A',
        area: country.area ? `${country.area.toLocaleString()}` : '0',
        languages: (country.languages && Object.keys(country.languages).length > 0) 
            ? Object.entries(country.languages)
                .map(([iso, name]) => `${name} (${iso.toUpperCase()})`).join(', ') 
            : 'N/A',
        borders: (country.borders?.length > 0) ? country.borders.join(', ') : 'None',
        currency: (country.currency?.length > 0) ? country.currency.join(', ') : 'N/A',
        latlng: (country.latlng?.length === 2) ? country.latlng.join(' / ') : 'N/A'
    };

    return (
        <React.Fragment>
            <tr className={styles.row}>
                {/* Toggles expansion state to reveal more details */}
                <td className={`${styles.cell} ${styles.expandable}`} onClick={() => setIsExpanded(!isExpanded)}>
                    {country.name} {isExpanded ? '▼' : '▶'}
                </td>
                <td className={styles.cell}>{country.region}</td>
                <td className={styles.cell}>
                    <div className={styles.actions}>
                        <button onClick={() => onEdit(country)}>✎</button>
                        <button onClick={() => onDelete(country.id)}>🗑</button>
                    </div>
                </td>
            </tr>
            {isExpanded && (
                <tr>
                    <td colSpan="3">
                        <div className={styles.details}>
                            <p><strong>Capital:</strong> {display.capital}</p>
                            <p><strong>Subregion:</strong> {display.subregion}</p>
                            <p><strong>Area:</strong> {display.area} km²</p>
                            <p><strong>Demonym:</strong> {display.demonym}</p>
                            <p><strong>Languages:</strong> {display.languages}</p>
                            <p><strong>Borders:</strong> {display.borders}</p>
                            <p><strong>Currency:</strong> {display.currency}</p>
                            <p><strong>Lat/Lng:</strong> {display.latlng}</p>
                        </div>
                    </td>
                </tr>
            )}
        </React.Fragment>
    );
}

export default CountryRow;