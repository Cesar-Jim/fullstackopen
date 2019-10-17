import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogUrl, setBlogUrl] = useState('');
  const [blogLikes, setBlogLikes] = useState(0);

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const rows = () => blogs.map(blog => <Blog key={blog.id} blog={blog} />);

  const addBlog = event => {
    event.preventDefault();

    const blogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
      likes: blogLikes,
      id: blogs.length + 1,
    };

    blogService.create(blogObject).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog));

      setBlogTitle('');
      setBlogAuthor('');
      setBlogUrl('');
      setBlogLikes(0);
    });
  };

  const handleChange = (event, setter) => {
    setter(event.target.value);
  };

  return (
    <div>
      <h1>Favorite Blogs</h1>
      <ul>{rows()}</ul>
      <form onSubmit={addBlog}>
        <label htmlFor='blog-title'>Title: </label>
        <input
          id='blog-title'
          value={blogTitle}
          onChange={e => handleChange(e, setBlogTitle)}
        />
        <br />
        <br />
        <label htmlFor='blog-author'>Author: </label>
        <input
          id='blog-author'
          value={blogAuthor}
          onChange={e => handleChange(e, setBlogAuthor)}
        />
        <br />
        <br />
        <label htmlFor='blog-url'>URL: </label>
        <input
          id='blog-url'
          value={blogUrl}
          onChange={e => handleChange(e, setBlogUrl)}
        />
        <br />
        <br />
        <label htmlFor='blog-likes'>Likes: </label>
        <input
          id='blog-likes'
          value={blogLikes}
          onChange={e => handleChange(e, setBlogLikes)}
        />
        <br />
        <br />
        <button type='submit'>Add Blog</button>
      </form>
    </div>
  );
};

export default App;
