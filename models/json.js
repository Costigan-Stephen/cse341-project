const path = require('path');
const https = require('https');

const JSON_URL = 'https://byui-cse.github.io/cse341-course/lesson03/items.json';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const objectSchema = new Schema({
    tags: [],
    imageUrl: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('JSObject', objectSchema);