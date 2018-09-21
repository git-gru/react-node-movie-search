'use strict';

const express = require('express');
const router = express.Router();

var cache = require('memory-cache');
var moment = require('moment');
var config = require('../config/config.json');
var poster = require('../modules/posters');

router.get('/search', async (req, res) => {
    const { keyword } = req.query;

    res.set('Content-Type', 'application/json');

    if (!keyword) {
        res.status(400).json({ message: 'Invalid Request! Keyword is missing!', });
    }

    const cachedResult = cache.get(keyword);
    if (cachedResult) {
        const { posters, created } = cachedResult;
        res.json({ posters });

        if (moment().diff(moment(created, 'YYYY-MM-DDTHH:mm:ss'), 'm') > config.CACHE_TIMEOUT) {
            const refreshPosters = await poster.getAllPosters(keyword);
            cache.put(keyword, { posters: refreshPosters, created: moment().format('YYYY-MM-DDTHH:mm:ss') });
        }
    } else {
        const posters = await poster.getAllPosters(keyword);
        cache.put(keyword, { posters, created: moment().format('YYYY-MM-DDTHH:mm:ss') });
        res.json({ posters });
    }
});

router.post('/cache/refresh', (req, res) => {
    const cachedKeys = cache.keys();

    cachedKeys.forEach(async key => {
        cache.put(
            key,
            {
                posters: await poster.getAllPosters(key),
                created: moment().format('YYYY-MM-DDTHH:mm:ss'),
            },
        );
    });

    res.set('Content-Type', 'application/json');
    res.json({ message: 'Cache refreshed!' });
});

module.exports = router;