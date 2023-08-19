const { Schema, model, Types } = require('mongoose')

const userSchema = (
    {
        fullName: String,

        email: {type: String,
                unique: true,
                required: true},

        password: { type: String, 
            requires: true
        }
    }
)

module.exports = model("User", userSchema);