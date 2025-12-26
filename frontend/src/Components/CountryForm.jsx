import React, { useState, useEffect } from 'react';

const API_URL = "http://localhost:8080/api/countries";

function CountryForm({ initialData, onSaved, onCancel }) {
    const [formData, setFormData] = useState({
        name: "", capital: "", region: "", subregion: "", 
        demonym: "", area: 0, borders: "", currency: "", 
        latlng: "", languages: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Synchronizes internal form state when editing an existing country
    useEffect(() => {
        if (!initialData) return;

        setFormData({
            ...initialData,
            borders: initialData.borders?.join(", ") ?? "",
            currency: initialData.currency?.join(", ") ?? "",
            latlng: initialData.latlng?.join(", ") ?? "",
            languages: Object.entries(initialData.languages || {})
                .map(([iso, name]) => `${iso.trim()}:${name.trim()}`)
                .join(", ")
        });
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Normalizes form strings into data structures required by the API
    const parsePayload = (data) => ({
        ...data,
        area: Math.max(0, parseFloat(data.area) || 0),
        borders: data.borders.split(",").map(s => s.trim()).filter(Boolean),
        currency: data.currency.split(",").map(s => s.trim()).filter(Boolean),
        latlng: data.latlng.split(",").map(s => parseFloat(s)).filter(n => !isNaN(n)),
        languages: data.languages.split(",").reduce((acc, curr) => {
            const [iso, name] = curr.split(":").map(s => s.trim());
            if (iso && name) acc[iso] = name;
            return acc;
        }, {})
    });

    const performSave = async (payload) => {
        const id = initialData?.id;
        const config = {
            method: id ? 'PUT' : 'POST',
            url: `${API_URL}${id ? `/${id}` : ''}`,
            headers: { 'Content-Type': 'application/json' },
        };

        const response = await fetch(config.url, {
            method: config.method,
            headers: config.headers,
            body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error(`Save failed: ${response.statusText}`);
        return response;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const payload = parsePayload(formData);
            await performSave(payload);
            onSaved();
        } catch (err) {
            alert (err.message)
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="form-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h3>{initialData?.id ? 'Edit Country' : 'Add New Country'}</h3>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px' }}>
                
                <label>Name: <input name="name" value={formData.name} onChange={handleChange} required /></label>
                <label>Capital: <input name="capital" value={formData.capital} onChange={handleChange} /></label>
                <label>Region: <input name="region" value={formData.region} onChange={handleChange} /></label>
                <label>Subregion: <input name="subregion" value={formData.subregion} onChange={handleChange} /></label>
                <label>Demonym: <input name="demonym" value={formData.demonym} onChange={handleChange} /></label>
                <label>Area (km²): <input type="number" name="area" value={formData.area} onChange={handleChange} /></label>
                <label>Borders:<input name="borders" value={formData.borders} onChange={handleChange} placeholder="ITA, FRA" /></label>
                <label>Currency: <input name="currency" value={formData.currency} onChange={handleChange} placeholder="EUR, USD" /></label>
                <label>Lat/Lng: <input name="latlng" value={formData.latlng} onChange={handleChange} placeholder="30.9, 12.5" /></label>
                <label>Languages: <input name="languages" value={formData.languages} onChange={handleChange} placeholder="it:Italian, en:English" /></label>

                <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                    <button type="submit" disabled={isSubmitting} style={{ backgroundColor: isSubmitting ? '#ccc' : '#28a745', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>
                        {isSubmitting ? 'Saving...' : 'Submit'}
                    </button>
                    <button type="button" onClick={onCancel} style={{ padding: '10px 20px' }}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default CountryForm;