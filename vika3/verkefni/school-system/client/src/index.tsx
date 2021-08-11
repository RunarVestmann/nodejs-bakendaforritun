import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createTheme, ThemeProvider } from '@material-ui/core';

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={createTheme({ palette: { type: 'dark' } })}>
            <App />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);
