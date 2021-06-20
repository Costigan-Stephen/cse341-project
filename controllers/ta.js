//TA05 PLACEHOLDER
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');


const JSON_PARSE = require("../models/json");
const MAX_PER_PAGE = 10;
const JSON_URL = 'https://byui-cse.github.io/cse341-course/lesson03/items.json';
const POKE_IMG = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'


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
        title: 'Prove Activity 05',
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
                title: 'Prove Activity 08',
                path: '/ta08',
                page: page,
                totalPages: totalPages,
                objects: returnobject,
                objectsize: Object.keys(returnobject).length
            });
        });

}

exports.getTA09 = (req, res, next) => {
    var page = req.query.page;
    var object = [];
    let settings = { method: "Get" };
    if (!page) {
        page = 0;
    }
    const POKE_URL = 'https://pokeapi.co/api/v2/pokemon?offset=' + page + '&limit=10';
    fetch(POKE_URL, settings)
        .then(res => res.json())
        .then((json) => {
            object = JSON.parse(JSON.stringify(json));
            res.render('pages/ta09', {
                title: 'Prove Activity 09',
                path: '/ta09',
                page: page,
                objects: object.results,
                ImgURL: POKE_IMG,
            });
        })
        .catch((err) => {
            console.log(err);
        });

}