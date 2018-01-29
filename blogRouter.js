const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


const {
  BlogPosts
} = require('./models');

// we're going to add some blogs
// so there's some data to look at
BlogPosts.create(
  'initial blog', 'Dinner is relentless....', 'Mama Knows', '01.02.2100');
BlogPosts.create(
  '2nd blog', 'If you have anything better to do, do not clean the house', 'Marion Best', '02/02/2022');

// send back JSON representation of all blog
// on GET requests to root
router.get('/', (req, res) => {
  res.json(BlogPosts.get());
});


// when new blog added, ensure has required fields. if not,
// log error and return 400 status code with hepful message.
// if okay, add new item, and return it with a status 201.
router.post('/', jsonParser, (req, res) => {
  // ensure `title', 'content', and `author` are in request body
  const requiredFields = ['title', 'author', 'content', 'publishDate'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const item = BlogPosts.create(req.body.title, req.body.author, req.body.content, req.body.publishDate);
  res.status(201).json(item);
});

// Delete blogs (by id)!
router.delete('/:id', (req, res) => {
  BlogPosts.delete(req.params.id);
  console.log(`Deleted blog post \`${req.params.ID}\``);
  res.status(204).end();
});

// when PUT request comes in with updated blog, ensure has
// required fields. also ensure that blog id in url path, and
// blog id in updated item object match. if problems with any
// of that, log error and send back status code 400. otherwise
// call `Blog.updateItem` with updated blog.
router.put('/:id', jsonParser, (req, res) => {
  const requiredFields = ['title', 'author', 'content', 'publishDate'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    const message = (
      `Request path id (${req.params.id}) and request body id `
      `(${req.body.id}) must match`);
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating blog post with id\`${req.params.id}\``);
  const updatedItem = BlogPosts.update({
    id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    publishDate: req.body.publishDate
  });
  res.status(204).end();
})
// add endpoint for DELETE requests. These requests should
// have an id as a URL path variable and call
// `BlogPosts.delete()`
router.delete('/:id', (req, res) => {
  BlogPosts.delete(req.params.id);
  console.log(`Deleted blog post with id \`${req.params.ID}\``);
  res.status(204).end();
});

module.exports = router;