import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../store/posts';

export const Homepage = () => {
  const { posts } = useSelector((state) => state);
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <div>
      <h3>Welcome, {auth.username}</h3>
      {posts.posts &&
        posts.posts.map((post) => (
          <div key={post.id}>
            <p>{post.text}</p>
          </div>
        ))}
    </div>
  );
};

export default Homepage;
