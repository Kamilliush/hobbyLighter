<template>
    <div class="posts">
      <h2>Your Posts</h2>
      
      <div class="post-list">
        <div class="post-item" v-for="(post, index) in posts" :key="index">
          <div class="post-details">
            <h3>{{ post.title }}</h3>
            <p><strong>Date:</strong> {{ post.date }}</p>
            <p><strong>Author:</strong> {{ post.author }}</p>
            <p><strong>Content:</strong> {{ post.content }}</p>
            <div v-if="post.image">
              <img :src="post.image" alt="Post Image" class="post-image"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Posts",
    data() {
      return {
        posts: [
          {
            title: "Post 1",
            date: "2024-01-10",
            author: "Jan Kowalski",
            content: "This is the content of the first post. It contains some interesting information about the topic.",
            image: "https://via.placeholder.com/150", // optional image
          },
          {
            title: "Post 2",
            date: "2024-02-15",
            author: "Jan Kowalski",
            content: "This is the content of the second post. It discusses another interesting subject and provides insights.",
            image: "https://via.placeholder.com/150", // optional image
          },
          {
            title: "Post 3",
            date: "2024-03-01",
            author: "Jan Kowalski",
            content: "This post focuses on a different topic, offering detailed analysis and examples.",
            image: "https://via.placeholder.com/150", // optional image
          },
          {
            title: "Post 4",
            date: "2024-04-05",
            author: "Jan Kowalski",
            content: "In this post, we explore the challenges and solutions in a particular field of interest.",
            image: "", // no image for this post
          },
          {
            title: "Post 5",
            date: "2024-05-20",
            author: "Jan Kowalski",
            content: "The fifth post provides an overview of the latest trends and developments in the industry.",
            image: "https://via.placeholder.com/150", // optional image
          },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .posts {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
  }
  
  h2 {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 1.5rem;
  }
  
  .post-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Elastyczne kolumny */
    gap: 1rem;
    margin-top: 2rem;
    width: 100%;
  }
  
  .post-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  
  .post-item h3 {
    font-size: 1.2rem;
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  .post-item p {
    font-size: 0.9rem;
    color: #666;
    margin: 0.2rem 0;
  }
  
  .post-image {
    width: 100%;
    height: auto;
    margin-top: 1rem;
    border-radius: 8px;
  }
  </style>
  