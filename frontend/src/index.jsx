import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
// import './index.css';    TODOcss

const container = document.getElementById('root');

if (!container) {
    throw new Error(
        "Unable to find 'root' element from index.html"
    );
}

const root = createRoot(container);

// TODO remove StrictMode for official release (?)
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);