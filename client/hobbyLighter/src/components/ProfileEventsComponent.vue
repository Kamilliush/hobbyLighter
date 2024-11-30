<template>
    <div class="events">
      <h2>Your Completed Events</h2>
      
      <div class="event-list">
        <div class="event-item" v-for="(event, index) in events" :key="index">
          <div class="event-details">
            <h3>{{ event.name }}</h3>
            <p><strong>Date:</strong> {{ event.date }}</p>
            <p><strong>Location:</strong> {{ event.location }}</p>
            <p><strong>Category:</strong> {{ event.category }}</p>
            <p><strong>Description:</strong> {{ event.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Events",
    data() {
      return {
        events: [
          {
            name: "Event 1",
            date: "2024-01-15",
            location: "New York, USA",
            category: "Sports",
            description: "A fun sports event with competitions and games.",
          },
          {
            name: "Event 2",
            date: "2024-02-20",
            location: "Los Angeles, USA",
            category: "Music",
            description: "A grand concert with various artists performing.",
          },
          {
            name: "Event 3",
            date: "2024-03-05",
            location: "Berlin, Germany",
            category: "Technology",
            description: "A tech conference showcasing the latest innovations.",
          },
          {
            name: "Event 4",
            date: "2024-04-18",
            location: "Tokyo, Japan",
            category: "Culture",
            description: "A cultural festival featuring traditional performances.",
          },
          {
            name: "Event 5",
            date: "2024-05-10",
            location: "Paris, France",
            category: "Food",
            description: "A food festival with tastings and chef demonstrations.",
          },
          {
            name: "Event 6",
            date: "2024-06-22",
            location: "Sydney, Australia",
            category: "Outdoor",
            description: "An outdoor adventure event with hiking and nature walks.",
          },
          {
            name: "Event 7",
            date: "2024-07-15",
            location: "London, UK",
            category: "Art",
            description: "An art exhibition with works from local and international artists.",
          },
          {
            name: "Event 8",
            date: "2024-08-30",
            location: "Rome, Italy",
            category: "History",
            description: "A historical tour of the city, exploring ancient landmarks.",
          },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .events {
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
  
  .event-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Elastyczne kolumny */
    gap: 1rem;
    margin-top: 2rem;
    width: 100%;
  }
  
  .event-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  
  .event-item h3 {
    font-size: 1.2rem;
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  .event-item p {
    font-size: 0.9rem;
    color: #666;
    margin: 0.2rem 0;
  }
  </style>
  