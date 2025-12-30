import { useState, useEffect } from 'react';
import styles from './CountryForm.module.css';

const API_URL = "/api/countries"

function CountryForm({ initialData, onSaved, onCancel }) {
    const [formData, setFormData] = useState({
        name: "", capital: "", region: "", subregion: "", 
        demonym: "", area: 0, borders: "", currency: "", 
        lat: 0, lng: 0, languages: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Synchronizes internal form state when editing an existing country
    useEffect(() => {
        if (!initialData) return;

        setFormData({
            ...initialData,
            borders: initialData.borders?.join(", ") ?? "",
            currency: initialData.currency?.join(", ") ?? "",
            lat: initialData.latlng?.[0] ?? 0,
            lng: initialData.latlng?.[1] ?? 0,
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
        latlng: [
            parseFloat(data.lat) || 0, 
            parseFloat(data.lng) || 0
        ],
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
        <div className={styles.formContainer}>
            <h3>{initialData?.id ? 'Edit Country' : 'Add New Country'}</h3>
            <form onSubmit={handleSubmit} className={styles.form}>
                
                <div className={styles.field}>
                    <label>Name</label>
                    <input name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className={styles.field}>
                    <label>Capital</label>
                    <input name="capital" value={formData.capital} onChange={handleChange} />
                </div>
                <div className={styles.field}>
                    <label>Region</label>
                    <input name="region" value={formData.region} onChange={handleChange} />
                </div>
                <div className={styles.field}>
                    <label>Subregion</label>
                    <input name="subregion" value={formData.subregion} onChange={handleChange} />
                </div>
                <div className={styles.field}>
                    <label>Demonym</label>
                    <input name="demonym" value={formData.demonym} onChange={handleChange} />
                </div>
                <div className={styles.field}>
                    <label>Area (km²)</label>
                    <input type="number" name="area" value={formData.area} onChange={handleChange} />
                </div>
                <div className={`${styles.field} ${styles.fullWidth}`}>
                    <label>Borders</label>
                    <input name="borders" value={formData.borders} onChange={handleChange} placeholder="ITA, FRA" />
                </div>
                <div className={`${styles.field} ${styles.fullWidth}`}>
                    <label>Currency</label>
                    <input name="currency" value={formData.currency} onChange={handleChange} placeholder="EUR, USD" />
                </div>
                <div className={styles.field}>
                    <label>Lat</label>
                    <input type="number" name="lat" value={formData.lat} onChange={handleChange} />
                </div>
                <div className={styles.field}>
                    <label>Lng</label>
                    <input type="number" name="lng" value={formData.lng} onChange={handleChange} />
                </div>
                <div className={`${styles.field} ${styles.fullWidth}`}>
                    <label>Languages</label>
                    <input name="languages" value={formData.languages} onChange={handleChange} placeholder="it:Italian, en:English" />
                </div>

                <div className={`${styles.actions} ${styles.fullWidth}`}>
                    <button type="submit" disabled={isSubmitting} className={styles.saveButton}>
                        {isSubmitting ? 'Saving...' : 'Submit'}
                    </button>
                    <button type="button" onClick={onCancel} className={styles.cancelButton}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default CountryForm;