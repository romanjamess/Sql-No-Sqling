const { Schema, model } = require("mongoose");

//scehma to create user model
const userSchema = new Schema(
    {
        userName: {
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
    },
    {
        toJSON: {
            virtuals:true,
        }
    }

);
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });
  
  const User = model('friendCount', userSchema);
  
  module.exports = User;
