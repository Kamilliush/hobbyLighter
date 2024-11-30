<template>
    <div class="space"></div>

    <div class="posts">
      <h2>Your Posts</h2>
  
      <!-- Form for Adding New Post -->
      <form @submit.prevent="addPost" class="post-form">
        <input v-model="newPost.title" type="text" placeholder="Title" required />
        <textarea v-model="newPost.content" placeholder="Description" required></textarea>
        <input v-model="newPost.author" type="text" placeholder="Author" required />
        <input v-model="newPost.location" type="text" placeholder="Location" required />
        <input v-model="newPost.image" type="url" placeholder="Image URL" />
        <button type="submit">Add Post</button>
      </form>
  
      <!-- Post List -->
      <div class="post-list">
        <div class="post-item" v-for="(post, index) in posts" :key="index">
          <!-- Post Image -->
          <img v-if="post.image" :src="post.image" alt="Post Image" class="post-image" />
  
          <!-- Profile and User Info -->
          <div class="post-header">
            <div class="profile-image"></div>
            <div class="user-info">
              <p class="username">{{ post.author }}</p>
              <p class="location">{{ post.location }}</p>
            </div>
            <div class="post-controls">
              <button @click="likePost(index)">
                ↑
              </button>
              <span class="likes">{{ post.likes }}</span>
              <button @click="dislikePost(index)">
                ↓
              </button>
              <button class="hashtag-button">#</button>
            </div>
          </div>
  
          <!-- Post Description -->
          <div class="post-content">
            <p class="post-description">{{ post.content }}</p>
          </div>
  
          <!-- Comments -->
          <div class="comments">
            <p v-for="(comment, idx) in post.comments.slice(0, 3)" :key="idx">
              <strong>{{ comment.author }}:</strong> {{ comment.text }}
            </p>
            <button @click="post.showCommentForm = !post.showCommentForm">
              {{ post.showCommentForm ? "Cancel" : "Add Comment" }}
            </button>
            <div v-if="post.showCommentForm" class="comment-form">
              <textarea v-model="post.newCommentText" placeholder="Write a comment..." required></textarea>
              <button @click="addComment(index)">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="space"></div>
  </template>
  
  <script>
  export default {
    name: "Posts",
    data() {
      return {
        posts: [
          {
            title: "Post 1",
            author: "username",
            location: "City, Country",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed.",
            image: "https://via.placeholder.com/300",
            likes: 3213,
            comments: [
              { author: "policeman_jack", text: "lorem srorem mujem sieem, ipsum lorem" },
              { author: "todthemod", text: "lorem ipsum lorem ipsum lorem ipsum" },
              { author: "modthefosdsa", text: "jorem ipsum ipsum psum ipsum" },
            ],
            showCommentForm: false,
            newCommentText: "",
          },
        ],
        newPost: {
          title: "",
          author: "",
          location: "",
          content: "",
          image: "",
        },
      };
    },
    methods: {
      addPost() {
        const newPost = {
          ...this.newPost,
          likes: 0,
          comments: [],
          showCommentForm: false,
          newCommentText: "",
        };
        this.posts.push(newPost);
        this.newPost = { title: "", author: "", location: "", content: "", image: "" };
      },
      likePost(index) {
        this.posts[index].likes++;
      },
      dislikePost(index) {
        this.posts[index].likes--;
      },
      addComment(postIndex) {
        const post = this.posts[postIndex];
        if (post.newCommentText.trim()) {
          post.comments.push({ author: "You", text: post.newCommentText });
          post.newCommentText = ""; // Clear the comment input
          post.showCommentForm = false; // Hide the comment form
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .space{
    width: 100%;
    height: 10vh;
  }
  .posts {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: Arial, sans-serif;
  }
  
  h2 {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 1.5rem;
  }
  
  .post-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 600px;
    margin-bottom: 2rem;
  }
  
  .post-form input,
  .post-form textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
  }
  
  .post-form button {
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
  }
  
  .post-list {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
  }
  
  .post-item {
    width: 100%;
    background-color: #fff;
    padding: 1rem;
    border-radius: 0;
    box-shadow: none;
    border-bottom: 1px solid #ddd;
  }
  
  .post-image {
    width: 100%;
    height: auto;
    margin-bottom: 1rem;
  }
  
  .post-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .profile-image {
    width: 50px;
    height: 50px;
    background-color: #ccc;
    border-radius: 50%;
    margin-right: 1rem;
  }
  
  .user-info {
    flex: 1;
  }
  
  .username {
    font-weight: bold;
  }
  
  .location {
    color: #888;
  }
  
  .post-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .likes {
    font-weight: bold;
  }
  
  .hashtag-button {
    background: none;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
  }
  
  .post-content {
    margin-bottom: 1rem;
  }
  
  .comments {
    margin-top: 1rem;
  }
  
  .comments p {
    font-size: 0.9rem;
    margin: 0.5rem 0;
  }
  
  .comment-form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .comment-form textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  
  .comment-form button {
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
  