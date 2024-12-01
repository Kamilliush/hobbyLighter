<template>
  <div class="events">
    <h2>Your Joined Events</h2>
    <div class="event-list-container">
      <div v-if="userEvents.length > 0" class="event-list">
        <div v-for="event in userEvents" :key="event.id" class="event-item">
          <h3>{{ event.title }}</h3>
          <p><strong>Location:</strong> {{ event.location }}</p>
          <p><strong>Description:</strong> {{ event.description }}</p>
          <p><strong>Categories:</strong> {{ event.categories.join(", ") }}</p>
        </div>
      </div>
      <p v-else>You haven't joined any events yet.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileEvents",
  data() {
    return {
      userEvents: [], // Events joined by the user
    };
  },
  async mounted() {
    await this.fetchUserEvents();
  },
  methods: {
    async fetchUserEvents() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://172.20.10.4:3000/api/users/events", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const eventIds = (await response.json()).events;

          // Fetch event details based on the IDs
          const allEvents = [
            {
              id: 1,
              title: "Frontend Workshops",
              location: "Warsaw",
              categories: ["Technology", "Education"],
              description:
                "Learn the basics of frontend development, including HTML, CSS, and JavaScript.",
            },
            {
              id: 2,
              title: "Networking Meetup",
              location: "Krakow",
              categories: ["Business", "Networking"],
              description:
                "Expand your professional network and meet like-minded individuals in the business world.",
            },
            {
              id: 3,
              title: "IT Conference",
              location: "Online",
              categories: ["Technology"],
              description:
                "A global online conference discussing the latest trends in the IT industry.",
            },
            {
              id: 4,
              title: "Photography Workshop",
              location: "Berlin",
              categories: ["Photography", "Art"],
              description:
                "Enhance your photography skills with hands-on experience and expert advice.",
            },
          ];

          this.userEvents = allEvents.filter((event) =>
            eventIds.includes(event.id)
          );
        } else {
          console.error("Error fetching user events:", await response.json());
        }
      } catch (error) {
        console.error("Error fetching user events:", error);
      }
    },
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

.event-list-container {
  max-height: 400px; /* Set max height for scrollable container */
  overflow-y: auto; /* Enable vertical scrolling */
  width: 100%; /* Adjust the width to fit */
}

.event-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
