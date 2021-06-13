//TA05 PLACEHOLDER
const express = require('express');
const router = express.Router();
const https = require('https');

const JSON_PARSE = require("../models/json");
const MAX_PER_PAGE = 15;
const JSON_URL = 'https://byui-cse.github.io/cse341-course/lesson03/items.json';

exports.getTA04 = (req, res, next) => {
    res.render('pages/ta04', {
        title: 'Team Activity 04',
        path: '/ta04', // For pug, EJS 
        activeTA04: true, // For HBS
        contentCSS: true, // For HBS
    });
};

exports.getTA05 = (req, res, next) => {
    res.render('pages/ta05', {
        title: 'Team Activity 05',
        path: '/ta05'
    });
};

exports.getTA08 = (req, res, next) => {
    const page = req.query.page;
    var objects = [];
    var request = https.get(JSON_URL, function(response) {
        var body = "";
        response.on("data", function(chunk) { body += chunk; });
    });

    console.log(JSON.stringify(request));

    res.render('pages/ta08', {
        title: 'Team Activity 08',
        path: '/ta08'
    });
}