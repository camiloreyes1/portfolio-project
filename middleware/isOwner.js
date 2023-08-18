const User = require('../models/User');
const Portfolio = require('../models/Portfolio')

const isOwner = async (req, res, next) => {
    const {portfolioId}= req.params
    try{ 
       const portfolio = await  Portfolio.findById(portfolioId)
       if(portfolio.owner.toString() !== req.user._id){
        return res.status(401).json({msg: "you are not the owner :( "})
       }
       next()
    }
    catch(err){
        console.log(err)
        next(err)
    }
}

module.exports = isOwner