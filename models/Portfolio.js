const { Schema, model } = require ('mongoose') 

const portfolioSchema = new Schema(
    {
        owner: {type: Schema.Types.ObjectId, ref: 'User'},

        title: String,

        image: String,

        description: String

    },

    {
        timeseries: true
    }
)

module.exports = model('Portfolio', portfolioSchema)