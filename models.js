const uuid = require('uuid');

'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const blogpostsSchema = mongoose.Schema({
  title: {type: String, required: true},
  author: [{
    firstName: String,
    lastName: String
  }],
  content: {type: String, required: true},
  created: {type: Date, default: Date.now}

})
// *virtuals* (http://mongoosejs.com/docs/guide.html#virtuals)
// allow us to define properties on our object that manipulate
// properties that are stored in the database. Here we use it
// to generate a human readable string based on the author object
// we're storing in Mongo.

blogpostsSchema.virtual('authorNameString').get(function() {
  return `${this.author.firstName} ${this.author.lastName}`.trim()});

blogpostsSchema.methods.serialize = function() {
  return {
    id: this._id,
    title: this.title,
    author: this.authorNameString,
    created: this.created 
  };
}

const BlogPost = mongoose.model('Blog', blogpostsSchema);

module.exports = {BlogPost};
  
  
   
  