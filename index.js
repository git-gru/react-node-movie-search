'use strict';

const express = require('express');
const app = express();

const path = require('path');

// Server
const HOST = '127.0.0.1';
const PORT = process.env.PORT || 3000;

// path to front-end build
const FRONTEND_BUILD_PATH = path.join(__dirname, './frontend/build');

// static files
app.use(express.static(FRONTEND_BUILD_PATH));

// return the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(FRONTEND_BUILD_PATH, 'index.html'));
});

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});