'use strict';

var axios = require('axios');
var config = require('../config/config.json');

async function getPosters(page, search) {
    try {
        const res = await axios.get(`${config.API_URL}?apikey=${config.API_KEY}&s=${search}&page=${page}`);
        return res;
    } catch (err) {
        return;
    }
}

async function getAllPosters(search) {
    const posters = [];

    for (let i = 0; i < Math.ceil(config.MAX_POSTERS / config.POSTERS_PER_PAGE); i++) {
        const res = await getPosters(i + 1, search);

        if (res && res.data && res.data.Search) {
            posters.push(...res.data.Search);
        }
    }

    return posters;
}

module.exports = {
    getPosters,
    getAllPosters,
};