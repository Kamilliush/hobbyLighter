<template>
  <div class="main-page">
    <Navbar />

    <div class="main-content">
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
            <img v-if="post.image" :src="post.image" alt="Post Image" class="post-image" />
            <div class="post-header">
              <div class="profile-image"></div>
              <div class="user-info">
                <p class="username">{{ post.author }}</p>
                <p class="location">{{ post.location }}</p>
              </div>
              <div class="post-controls">
                <button @click="likePost(post)">↑</button>
                <span class="likes">{{ post.likes }}</span>
                <button @click="dislikePost(post)">↓</button>
              </div>
            </div>
            <div class="post-content">
              <p class="post-description">{{ post.content }}</p>
            </div>
            <div class="comments">
              <p v-for="(comment, idx) in post.comments.slice(0, 3)" :key="idx">
                <strong>{{ comment.author }}:</strong> {{ comment.text }}
              </p>
              <button @click="toggleCommentForm(index)">
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
    </div>

    <Navigation />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Navigation from "@/components/Navigation.vue";
import axios from "axios";

export default {
  name: "MainPage",
  components: {
    Navbar,
    Navigation,
  },
  data() {
    return {
      posts: [],
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
    async fetchPosts() {
      try {
        const response = await axios.get("http://localhost:3000/api/posts");
        this.posts = response.data;
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    },
    async addPost() {
      try {
        const response = await axios.post("http://localhost:3000/api/posts", this.newPost);
        this.posts.push(response.data);
        this.newPost = { title: "", author: "", location: "", content: "", image: "" };
      } catch (error) {
        console.error("Error adding post:", error);
      }
    },
    async likePost(post) {
      try {
        await axios.patch(`http://localhost:3000/api/posts/${post.id}/like`);
        post.likes++;
      } catch (error) {
        console.error("Error liking post:", error);
      }
    },
    async dislikePost(post) {
      try {
        if (post.likes > 0) {
          await axios.patch(`http://localhost:3000/api/posts/${post.id}/dislike`);
          post.likes--;
        }
      } catch (error) {
        console.error("Error disliking post:", error);
      }
    },
    toggleCommentForm(index) {
      this.posts[index].showCommentForm = !this.posts[index].showCommentForm;
    },
    async addComment(index) {
      const post = this.posts[index];
      if (post.newCommentText.trim()) {
        try {
          const response = await axios.post(`http://localhost:3000/api/posts/${post.id}/comments`, {
            author: "You",
            text: post.newCommentText,
          });
          post.comments.push(response.data);
          post.newCommentText = "";
          post.showCommentForm = false;
        } catch (error) {
          console.error("Error adding comment:", error);
        }
      }
    },
  },
  mounted() {
    this.fetchPosts();
  },
};
</script>


<style scoped>
.main-page {
  display: flex;
  flex-direction: column;
  height: 100vh; /* Full viewport height */
}

.main-content {
  flex: 1; /* Take up remaining space between navbar and navigation */
  overflow-y: auto; /* Enable scrolling if content overflows */
  padding: 2rem;
  background-color: #f5f5f5; /* Light background color */
}

.space {
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
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.post-image {
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
  border-radius: 8px;
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

/* Scrollbar styling for main-content */
.main-content::-webkit-scrollbar {
  width: 8px;
}

.main-content::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.main-content::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.main-content::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
