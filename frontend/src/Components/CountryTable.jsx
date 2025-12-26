import React from 'react';
import CountryRow from './CountryRow';

function CountryTable({ data, onEdit, onDelete }) {
    return (
        <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr style={{ backgroundColor: '#f2f2f2' }}>
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
    );
}

export default CountryTable;