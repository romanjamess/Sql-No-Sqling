const { Schema, model } = require("mongoose");

//scehma to create user model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/.+\@.+\..+/],
        },
        thoughts:[
            {
                type: Schema.Types.ObjectId,
                ref: "thoughts",
            }],
            friends: [
                {
                    type: Schema.Types.ObjectId,
                    ref: "user",
                }
            ]
    },
    {
        toJSON: {
            virtuals:true,
        },
        id: false,
    }

);
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });
  
  const user = model('user', userSchema);
  
  module.exports = user;
