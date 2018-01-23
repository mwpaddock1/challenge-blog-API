  let blogTemplate = (
    '<div class="blog js-blog">' +
    '<h2 class="js-blog-title"><h2>' +
    '<hr>' +
    '<h3 class="js-blog-author"><h3>' +
    '<hr>' +
    '<ul class="js-blog-content">' +
    '</ul>' +
    '<hr>' +
    '<div class="blog-controls">' +
    '<button class="js-blog-delete">' +
    '<span class="button-label">delete</span>' +
    '</button>' +
    '</div>' +
    '</div>'
  );

  let BLOGS_URL = '/blog-posts';

  function getAndDisplayBlogs() {
    console.log('Retrieving blogs')
    $.getJSON(BLOGS_URL, function (blogs) {
      console.log('Rendering blogs');
      let blogElements = blogs.map(function (blog) {
        let element = $(blogTemplate);
        element.attr('id', blog.id);
        element.find('.js-blog-title').text(blog.title);
        console.log(blog);
        console.log(blog.title)
        element.find('.js-blog-author').append(blog.author)
        console.log(blog.author);
         element.find('.js-blog-content').append(
           blog.content);
        console.log(blog.content) 
      
        return element;
        console.log(element);
      });
        $('.js-blogs').html(blogElements);
    });
  }

  function addBlog(blog) {
    console.log('Adding blog: ' + blog);
    $.ajax({
      method: 'POST',
      url: BLOGS_URL,
      data: JSON.stringify(blog),
      success: function (data) {
        getAndDisplayBlogs();
      },
      dataType: 'json',
      contentType: 'application/json'
    });
  }

  function deleteBlog(blogId) {
    console.log('Deleting blog `' + blog.Id + '`');
    $.ajax({
      url: BLOGS_URL + '/' + blog.Id,
      method: 'DELETE',
      success: getAndDisplayBlogs
    });
  }

  function updateBlog(blog) {
    console.log('Updating blog `' + blog.id + '`');
    $.ajax({
      url: BLOGS_URL + '/' + blog.id,
      method: 'PUT',
      data: blog,
      success: function (data) {
        getAndDisplayBlogs();
      }
    });
  }

  function handleBlogAdd() {
    $('#js-blog-form').submit(function (e) {
      e.preventDefault();
      let contents = $(
        e.currentTarget).find(
        '#blog-content').val().split(',').map(
        function (contents) {
          return contents.trim()
        });
      addBlog({
        name: $(e.currentTarget).find('#blog-name').val(),
        content: contents
      });
    });
  }

  function handleBlogDelete() {
    $('.js-blogs').on('click', '.js-blog-delete', function (e) {
      e.preventDefault();
      deleteBlog(
        $(e.currentTarget).closest('.js-blog').attr('id'));
    });
  }

  $(function () {
    getAndDisplayBlogs();
    handleBlogAdd();
    handleBlogDelete();
    // updateBlog();
  });