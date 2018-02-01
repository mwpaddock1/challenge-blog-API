const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


const {
  BlogPosts
} = require('./models');



// send back JSON representation of all blog
// on GET requests to root
router.get('/', (req, res) => {
  res.json(BlogPosts.get());
});

router.get('/', (req, res) => {
  Blog
    .find()
    .limit(10)
    .then(blogs => {
      res.json({
        blogs: blogs.map(
          (blog) => blog.serialize())
      });

    });
    app.get('/posts/:id', (req, res) => {
      BlogPost
        .findById(req.params.id)
        .then(post => res.json(post.serialize()))
        .catch(err => {
          console.error(err);
          res.status(500).json({ error: 'something went wrong awry' });
        });
    });
    

  // when new blog added, ensure has required fields. if not,
  // log error and return 400 status code with hepful message.
  // if okay, add new item, and return it with a status 201.
  router.post('/', jsonParser, (req, res) => {
    // ensure `title', 'content', and `author` are in request body
    const requiredFields = ['title', 'author', 'content'];
    for (let i = 0; i < requiredFields.length; i++) {
      const field = requiredFields[i];
      if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`
        console.error(message);
        return res.status(400).send(message);
      }
    }

    BlogPost
      .create({
        title: req.body.title,
        author: req.body.author,
        content: req.body.content,
        created: req.body.created
      })
      .then(restaurant => res.status(201).json(restaurant.serialize()))
      .catch(err => {
        console.error(err);
        res.status(500).json({
          message: 'Internal server error'
        });
      });
  });
});

// Delete blogs (by id)!
router.delete('BlogPosts/:id', (req, res) => {
  BlogPost
  .findByIdAndRemove(req.params.id)
  .then(BlogPost => res.status(204).end())
  .catch(err => res.status(500).json({
    messge: 'Internal server error'
  }));
});
// when PUT request comes in with updated blog, ensure has
// required fields. also ensure that blog id in url path, and
// blog id in updated item object match. if problems with any
// of that, log error and send back status code 400. otherwise
// call `Blog.updateItem` with updated blog.
router.put('/:id', jsonParser, (req, res) => {
  const requiredFields = ['title', 'author', 'content'];
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
  });
  res.status(200).send(updatedItem);
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