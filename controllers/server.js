const avengeryData = require('../data/ta10_data.json');

const fs = require('fs'); // File system for TA01
const fetch = require('node-fetch');




exports.submitName = (req, res, next) => {
    const name = req.body.name;
    const alias = req.body.alias;
    const imgPath = req.body.file;

    const hero = { "name": name, "alias": alias, "image": imgPath };

    console.log(hero);

    var domain = req.protocol + "://" + req.get('host');

    const uri = domain + '/prove/10/post';

    fetch(uri, {
            method: 'POST', // Send a POST request
            headers: {
                // Set the Content-Type, since our server expects JSON
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
        })
        .then(res => {
            if (hero.length > 0)
                this.addToList(hero)
        })
        .catch(err => {
            // Clear the input
            console.error(err)
        })
    res.redirect("/prove/10");

};

exports.addToList = (hero) => {

    if (!hero.image)
        hero.image = "/images/heroes/none.jpg";

    console.log(hero.image);

    avengeryData.avengers.push(hero);
    fs.writeFile("./data/ta10_data.json",
        JSON.stringify(avengeryData), 'utf8',
        function(err) {
            if (err) throw err;
            console.log('File updated');
        });
};

exports.post = (req, res, next) => {

    if (req.name !== undefined) {

        const name = req.body.name;
        const alias = req.body.alias;
        const image = req.body.file;
        const imgPath = "/images/heroes/none.jpg";

        url = image.path;
        const filename = uuid() + '.jpg';
        const path = './images/heroes/' + filename;

        console.log(imgPath);
        if (!avengeryData.avengers.some(a => a.name === name)) {
            avengeryData.avengers.push({ name: name, alias: alias, image: imgPath }) // Push new object into the dummyData
            console.log(avengeryData);
            res.sendStatus(200)
        }
    } else {
        res.sendStatus(400) // Bad request error code
    }

};