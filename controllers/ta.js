//TA PLACEHOLDER
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const fs = require('fs'); // File system for TA01

const avengeryData = require('../data/ta10_data.json');
const JSON_PARSE = require("../models/json");
const MAX_PER_PAGE = 10;
const JSON_URL = 'https://byui-cse.github.io/cse341-course/lesson03/items.json';
const POKE_IMG = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';


exports.getTA04 = (req, res, next) => {
    res.render('pages/ta04', {
        title: 'Team Activity 04',
        path: '/prove/04', // For pug, EJS 
        activeTA04: true, // For HBS
        contentCSS: true, // For HBS
    });
};

exports.getTA05 = (req, res, next) => {
    res.render('pages/ta05', {
        title: 'Prove Activity 05',
        path: '/prove/05'
    });
};

exports.getTA08 = (req, res, next) => {
    var page = req.query.page;
    if (!page) {
        page = 1;
    }
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
                path: '/prove/08',
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
        offset = 0;
    } else {
        offset = page * 10;
    }
    const POKE_URL = 'https://pokeapi.co/api/v2/pokemon?offset=' + offset + '&limit=10';
    fetch(POKE_URL, settings)
        .then(res => res.json())
        .then((json) => {
            object = JSON.parse(JSON.stringify(json));
            res.render('pages/ta09', {
                title: 'Prove Activity 09',
                path: '/prove/09',
                page: page,
                objects: object.results,
                ImgURL: POKE_IMG,
            });
        })
        .catch((err) => {
            console.log(err);
        });

}

exports.getTA10 = (req, res, next) => {
    var page = req.query.page;
    if (!page) {
        page = 0;
    }
    var object = avengeryData;
    var pageLast = (object.length / 10);
    if (!pageLast)
        pageLast = 0;

    res.render('pages/ta10', {
        title: 'Prove Activity 10',
        path: '/prove/10',
        page: page,
        pageLast: pageLast,
        objects: object.avengers,
        domain: req.protocol + "://" + req.get('host')
    });
};

exports.postTA10 = (req, res, next) => {

    console.log(req.name);

    if (req.body.name !== undefined) {
        const name = req.body.name;
        const url = req.body.url;
        const alias = req.body.alias;

        // Make our submissions somewhat unique.
        if (!avengeryData.avengers.some(a => a.name === name)) {
            avengeryData.avengers.push({ name: name, alias: alias, image: url }) // Push new object into the avengeryData

            fs.writeFile('data/ta10_data.json',
                JSON.stringify(avengeryData),
                'utf8',
                function(err) {
                    if (err) throw err;
                    console.log('File updated');
                });

            res.sendStatus(200)
        }
    } else {
        res.sendStatus(400) // Bad request error code
    }
};


exports.getTA11 = (req, res, next) => {
    var page = req.query.page;
    if (!page) {
        page = 0;
    }
    var object = avengeryData;
    var pageLast = (object.length / 10);
    if (!pageLast)
        pageLast = 0;

    res.render('pages/ta11', {
        title: 'Prove Activity 11',
        path: '/prove/11',
        page: page,
        pageLast: pageLast,
        objects: object.avengers,
        domain: req.protocol + "://" + req.get('host')
    });
};

exports.postTA11 = (req, res, next) => {

    console.log(req.name);

    if (req.body.name !== undefined) {
        const name = req.body.name;
        const image = req.body.image;
        const alias = req.body.alias;

        // Make our submissions somewhat unique.
        if (!avengeryData.avengers.some(a => a.name === name)) {
            avengeryData.avengers.push({ name: name, alias: alias, image: image }) // Push new object into the avengeryData

            fs.writeFile('data/ta10_data.json',
                JSON.stringify(avengeryData),
                'utf8',
                function(err) {
                    if (err) throw err;
                    console.log('File updated');
                });

            res.sendStatus(200)
        }
    } else {
        res.sendStatus(400) // Bad request error code
    }
};

exports.fetch = (req, res, next) => {
    res.json(avengeryData);
}