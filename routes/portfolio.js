var express = require('express');
var router = express.Router();

var Portfolio = require('../models/Portfolio');
var User = require('../models/User');

const isAuthenticated = require('../middleware/isAuthenticated');
const isOwner = require('../middleware/isOwner');

router.get('/', (req,res,next) => {
    Portfolio.find() 

    .then((allPortfolios) => {
        res.json(allPortfolios)
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })
    
})

router.post('/new-portfolio', isOwner, isAuthenticated, (req, res, next) => {
    Portfolio.create({
        owner: req.user._id,
        title,
        image,
        description,
    })

    .then((newPortfolio) => {
        res.json(newPortfolio)
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })
})

module.exports = router;
