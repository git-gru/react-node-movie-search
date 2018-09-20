'use strict';

const express = require('express');
const router = express.Router();

// return the React app, so it can handle routing.
router.get('/', (req, res) => {
    res.send('api')
});

module.exports = router;