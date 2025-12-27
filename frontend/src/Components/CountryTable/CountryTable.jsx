import React from 'react';
import CountryRow from '../CountryRow/CountryRow';
import styles from './CountryTable.module.css';

function CountryTable({ data, onEdit, onDelete }) {
    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Region</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((country) => (
                        <CountryRow 
                            key={country.id} 
                            country={country} 
                            onEdit={onEdit} 
                            onDelete={onDelete} 
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CountryTable;