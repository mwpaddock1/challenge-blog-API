  
  let blogTemplate = (
    '<div class="blog js-blog">' +
      '<h3 class="js-blog-title"><h3>' +
      '<hr>' +
      '<ul class="js-blog-content">' +
      '</ul>' +
      '<div class="blog-controls">' +
        '<button class="js-blog-delete">' +
          '<span class="button-label">delete</span>' +
        '</button>' +
      '</div>' +
    '</div>'
  );
  
  
  let BLOGS_URL = '/blogs';
  
  
  
  function getAndDisplayBlogs() {
    console.log('Retrieving blogs')
    $.getJSON(BLOGS_URL, function(blogs) {
      console.log('Rendering blogs');
      let blogElement = blogs.map(function(blog) {
        let element = $(blogTemplate);
        element.attr('id', blog.id);
        element.find('.js-blog-title').text(blog.name);
        blog.content.forEach(function(content) {
          element.find('.js-blog-content').append(
            '<li>' + content + '</li>');
        });
        return element;
      });
      $('.js-blogs').html(blogsElement)
    });
  }
  
  
  function addBlog(blog) {
    console.log('Adding blog: ' + blog);
    $.ajax({
      method: 'POST',
      url: BLOGS_URL,
      data: JSON.stringify(blog),
      success: function(data) {
        getAndDisplayBlogs();
      },
      dataType: 'json',
      contentType: 'application/json'
    });
  }
  
   
  function deleteBlog(blogId) {
    console.log('Deleting blog `' + blogId + '`');
    $.ajax({
      url: BLOGS_URL + '/' + blogId,
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
      success: function(data) {
        getAndDisplayBlogs();
      }
    });
  }
  
 
  function handleBlogAdd() {
    $('#js-blog-form').submit(function(e) {
      e.preventDefault();
      var ingredients = $(
        e.currentTarget).find(
        '#ingredients-list').val().split(',').map(
          function(contents) { return ingredient.trim() });
      addBlog({
        name: $(e.currentTarget).find('#blog-name').val(),
        content: content
      });
    });
  }
  
  
  
  function handleBlogDelete() {
    $('.js-blogs').on('click', '.js-blog-delete', function(e) {
      e.preventDefault();
      deleteBlog(
        $(e.currentTarget).closest('.js-blog').attr('id'));
    });
  }
  
  
  
  
  $(function() {
    getAndDisplayBlogs();
    handleBlogAdd();
    handleBlogDelete();
  });