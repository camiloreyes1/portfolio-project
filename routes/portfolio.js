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

router.post('/edit/:portfolioId' , isAuthenticated, isOwner, (req, res, next) => {

    const { portfiolioId } = req.params
    const { description, title, image } = req.body

    
    Portfolio.findByIdAndUpdate(

        portfiolioId,
        {
            description,
            title,
            image
        },
        {
            new: true
        })
        .then((updatedPorfolio) => {
            res.json(updatedPorfolio)
        })
        .catch((err) => {
            console.log(err)
            next(err)
        })
})

router.post('/delete/:portfolioId', isAuthenticated, isOwner, (req,res,next) => {

    const { portfiolioId } = req.params

    Portfolio.findByIdAndDelete(portfiolioId)
    .then((deletedPortfolio) => {
        res.json(deletedPortfolio)
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })
})

module.exports = router;
