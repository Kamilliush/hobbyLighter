<template>
    <div class="comment-page">
      <Navbar />
      <div class="post-details">
        <img v-if="post.image" :src="post.image" alt="Post Image" class="post-image" />
        <h2>{{ post.title }}</h2>
        <p class="author">Author: {{ post.author }}</p>
        <p class="location">Location: {{ post.location }}</p>
        <p class="content">{{ post.content }}</p>
        <p class="likes">Likes: {{ post.likes }}</p>
      </div>
      <div class="comments-section">
        <h3>Comments</h3>
        <div class="comment" v-for="(comment, index) in post.comments" :key="index">
          <strong>{{ comment.author }}</strong>: {{ comment.text }}
        </div>
        <form @submit.prevent="addComment" class="comment-form">
          <textarea v-model="newCommentText" placeholder="Write a comment..." required></textarea>
          <button type="submit">Add Comment</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import Navbar from "@/components/Navbar.vue";
  import axios from "axios";
  import { useUserStore } from "@/stores/user";
  
  export default {
    name: "Comment",
    components: {
      Navbar,
    },
    data() {
      return {
        post: null,
        newCommentText: "",
      };
    },
    methods: {
      async fetchPost() {
        const postId = this.$route.params.id; // Pobierz ID posta z parametrów trasy
        try {
          const response = await axios.get(`http://localhost:3000/api/posts/${postId}`);
          this.post = response.data;
        } catch (error) {
          console.error("Error fetching post:", error);
        }
      },
      async addComment() {
        const userStore = useUserStore(); // Pobierz dane użytkownika
        if (this.newCommentText.trim()) {
          try {
            const response = await axios.post(
              `http://localhost:3000/api/posts/${this.post.id}/comments`,
              {
                author: userStore.username,
                text: this.newCommentText,
              }
            );
            this.post.comments.push(response.data);
            this.newCommentText = ""; // Wyczyść pole tekstowe
          } catch (error) {
            console.error("Error adding comment:", error);
          }
        }
      },
    },
    mounted() {
      this.fetchPost();
    },
  };
  </script>
  
  <style scoped>
  .comment-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    font-family: Arial, sans-serif;
  }
  
  .post-details {
    margin-bottom: 2rem;
    text-align: center;
  }
  
  .post-image {
    max-width: 100%;
    border-radius: 8px;
    margin-bottom: 1rem;
  }
  
  .comments-section {
    width: 100%;
    max-width: 600px;
  }
  
  .comment {
    padding: 1rem;
    margin-bottom: 1rem;
    background-color: #f5f5f5;
    border-radius: 8px;
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
  