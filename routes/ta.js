const express = require('express');
const router = express.Router();

const taController = require('../controllers/ta');
const svController = require('../controllers/server');

router.get('/prove/04', taController.getTA04);

router.get('/prove/05', taController.getTA05);

router.get('/prove/08', taController.getTA08);

router.get('/prove/09', taController.getTA09);

router.get('/prove/10', taController.getTA10);

router.post('/prove/10', (req, res, next) => {
    // Typically you should do some sort of filtering and error checking. This is minimal, and makes sure we're not accepting empty values
    console.log(req)
    if (req.body.name !== undefined) {
        const name = req.body.name

        // Make our submissions somewhat unique.
        if (!dummyData.avengers.some(a => a.name === name)) {
            dummyData.avengers.push({ name: name }) // Push new object into the dummyData
            res.sendStatus(200)
        }
    } else {
        res.sendStatus(400) // Bad request error code
    }
})


router.get('/prove/10/fetch', taController.fetch);

module.exports = router;