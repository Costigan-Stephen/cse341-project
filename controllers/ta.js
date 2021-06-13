//TA05 PLACEHOLDER
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');


const JSON_PARSE = require("../models/json");
const MAX_PER_PAGE = 10;
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
    var page = req.query.page;
    var returnobject = [];
    var object = [];
    var totalPages = 0;
    let settings = { method: "Get" };
    fetch(JSON_URL, settings)
        .then(res => res.json())
        .then((json) => {
            return json;
        })
        .then((json) => {
            object = JSON.parse(JSON.stringify(json));
            if (!page) {
                page = 1;
            }
            var x = 0;
            for (var i = 0; i < Object.keys(object).length; i++) {
                if (i >= MAX_PER_PAGE * (page - 1) && i < MAX_PER_PAGE * (page)) {
                    returnobject[x] = object[i];
                    x++;
                }
                if (i % MAX_PER_PAGE == 0) {
                    totalPages++;
                }
            }
            res.render('pages/ta08', {
                title: 'Team Activity 08',
                path: '/ta08',
                page: page,
                totalPages: totalPages,
                objects: returnobject,
                objectsize: Object.keys(returnobject).length
            });
        });

}