import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Typography from '@mui/material/Typography'

const Posts = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    // Fetch users from the backend on component mount

    axios
      .get('http://localhost:8080/posts')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error(error))
  }, [])

  return (
    <div>
      <Typography variant='h1' color='darkcyan'>
        Posts
      </Typography>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>{post.username}</li>
        ))}
      </ul>
    </div>
  )
}

export default Posts
