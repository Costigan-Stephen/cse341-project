const express = require('express')
const router = express.Router()
const avengeryData = require('../data/ta10_data.json');

const path = require("path");
const fs = require('fs'); // File system for TA01


const fetch = require('node-fetch');

exports.post = (req, res, next) => {

    console.log(req);

    const name = req.body.name;
    const alias = req.body.alias;
    const imgPath = req.body.url;

    const hero = { "name": name, "alias": alias, "image": imgPath };

    if (req.body.name !== undefined) {

        const name = req.body.name;
        const alias = req.body.alias;
        const imgPath = req.body.url;

        if (!imgPath)
            imgPath = "/images/heroes/none.jpg";

        console.log(imgPath);
        if (!avengeryData.avengers.some(a => a.name === name)) {
            avengeryData.avengers.push({ name: name, alias: alias, image: imgPath }) // Push new object into the dummyData
            res.sendStatus(200)
        }
    } else {
        res.sendStatus(400) // Bad request error code
    }
}