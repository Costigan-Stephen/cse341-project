const express = require('express')
const router = express.Router()
const avengeryData = require('../data/ta10_data.json');
const fs = require('fs'); // File system for TA01

const fetch = require('node-fetch');

const addToList = (req, res, next) => {
    var avId = avengeryData.length;
    const name = req.body.name;
    const alias = req.body.alias;
    const image = req.file;

    const hero = { "name": name, "alias": alias, "image": image };

    avengeryData.avengers.push(hero);
    console.log(avengeryData);
    fs.writeFile("./data/ta10_data.json",
        JSON.stringify(avengeryData), 'utf8',
        function(err) {
            if (err) throw err;
            console.log('File updated');
        });
}

exports.post = (req, res, next) => {


    if (req.body.name !== undefined) {

        const name = req.body.name;
        const alias = req.body.alias;
        const image = req.file;
        const imgPath = "";

        url = image.path;
        const filename = uuid() + '.jpg';
        const path = './images/heroes/' + filename;

        if (image) {
            const download = (url, path, callback) => {
                request.head(url, (err, res, body) => {
                    request(url)
                        .pipe(fs.createWriteStream(path))
                        .on('close', callback)
                })
            }
            download(url, path, () => {

            });
            imgPath = path;
        }

        if (!avengeryData.avengers.some(a => a.name === name)) {
            avengeryData.avengers.push({ name: name, alias: alias, image: image.path }) // Push new object into the dummyData
            res.sendStatus(200)
        }
    } else {
        res.sendStatus(400) // Bad request error code
    }

}

exports.submitName = (req, res, next) => {
    const newName = req.body.name;
    var domain = req.protocol + "://" + req.get('host');

    const uri = domain + '/prove/10/postData';

    fetch(uri, {
            method: 'POST', // Send a POST request
            headers: {
                // Set the Content-Type, since our server expects JSON
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ newName })
        })
        .then(res => {
            addToList(req)
        })
        .catch(err => {
            // Clear the input
            console.error(err)
        })
    res.redirect("/prove/10");

}