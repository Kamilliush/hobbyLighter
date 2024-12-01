<template>
  <div class="challenges-panel">
    <h1>Challenges</h1>
    <div v-for="challenge in challenges" :key="challenge.id" class="challenge-card">
      <h2 class="line_h2">{{ challenge.name }}</h2>
      <p class="line"><strong>Organized by:</strong> {{ challenge.organizer }}</p>
      <p class="line"><strong>Date:</strong> {{ challenge.date }}</p>
      <p class="line"><strong>Description:</strong> {{ challenge.description }}</p>
      <p class="line">
        <strong>Participants:</strong> 
        {{ challenge.participants.length }} / {{ challenge.maxParticipants }}
      </p>
      <button 
        :disabled="isJoined(challenge) || challenge.participants.length >= challenge.maxParticipants" 
        @click="joinChallenge(challenge)"
      >
        {{ isJoined(challenge) ? 'You\'ve joined!' : 'Join' }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Challenges",
  data() {
    return {
      userName: "Your Name", // Default user name
      challenges: [
        {
          id: 1,
          name: "Code Marathon",
          organizer: "Tech Academy",
          date: "2024-12-05",
          description: "A 24-hour coding competition to test your programming skills and creativity.",
          participants: ["John", "Anna"],
          maxParticipants: 5,
        },
        {
          id: 2,
          name: "AI Innovation Challenge",
          organizer: "AI Pioneers",
          date: "2024-12-10",
          description: "Develop innovative AI solutions to real-world problems in this exciting challenge.",
          participants: ["Mark"],
          maxParticipants: 10,
        },
        {
          id: 3,
          name: "Design Sprint",
          organizer: "Creative Minds",
          date: "2024-12-15",
          description: "Work with a team to design and prototype solutions for complex problems in just one day.",
          participants: [],
          maxParticipants: 5,
        },
        {
          id: 4,
          name: "Fitness Tracker Hackathon",
          organizer: "HealthTech",
          date: "2024-12-20",
          description: "Build a fitness tracking app that motivates users to stay active and healthy.",
          participants: [],
          maxParticipants: 10,
        },
        {
          id: 5,
          name: "Cybersecurity Defense Challenge",
          organizer: "CyberSafe Inc.",
          date: "2025-01-05",
          description: "Test your cybersecurity skills by defending a simulated system from cyber attacks.",
          participants: [],
          maxParticipants: 50,
        },
        {
          id: 6,
          name: "Sustainable Tech Ideas",
          organizer: "Green Future",
          date: "2025-01-15",
          description: "Propose sustainable technology solutions that can help protect the environment.",
          participants: [],
          maxParticipants: 20,
        },
        {
          id: 7,
          name: "Drone Racing Challenge",
          organizer: "High Flyers Club",
          date: "2025-01-25",
          description: "Compete in high-speed drone races and showcase your piloting skills.",
          participants: [],
          maxParticipants: 15,
        },
      ],
    };
  },
  methods: {
    joinChallenge(challenge) {
      if (!this.isJoined(challenge) && challenge.participants.length < challenge.maxParticipants) {
        challenge.participants.push(this.userName);
      }
    },
    isJoined(challenge) {
      return challenge.participants.includes(this.userName);
    },
  },
};
</script>

<style scoped>
.challenges-panel {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.challenge-card {
  margin-bottom: 20px;
  padding: 15px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
h2 {
  margin: 0 0 10px;
  font-size: 50px;
}

h1 {
  margin-bottom: 5%;
}
.line {
  margin-top: 2%;
  font-size: 1rem;
}
button {
  padding: 8px 12px;
  margin-top: 5%;
  background-color: #14213D;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.line_h2{
  font-size: 25px;
}
</style>
