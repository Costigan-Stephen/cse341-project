//TA02 PLACEHOLDER
// Remember, you can make more of these placeholders yourself! 
const express = require('express');
const router = express.Router();

// users added for Requirement 1
const userArray = ["Peter", "James", "John"];
var message = "";

// Requirement 2 - /addUser
router.post('/addUser', (req, res, next) => {
    const pos = userArray.indexOf(req.body.newUser);
    if (pos !== -1) {
        message = "User already exists";
    } else {
        userArray.push(req.body.newUser);
    }
    res.redirect("/ta02/");
});

// Requirement 3 - /removeUser
router.post('/removeUser', (req, res, next) => {
    const pos = userArray.indexOf(req.body.removeUser);
    if (pos !== -1) {
        userArray.splice(pos, 1);
    } else {
        message = "User not found";
    }
    res.redirect("/ta02/");
});

router.get('/', (req, res, next) => {
    res.render('pages/ta02', {
        title: 'Team Activity 02',
        userList: userArray,
        message: message,
        path: '/ta02', // For pug, EJS 
        activeTA03: true, // For HBS
        contentCSS: true, // For HBS
    });
});

module.exports = router;