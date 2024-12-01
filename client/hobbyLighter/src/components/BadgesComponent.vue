<template>
  <div class="badges">
    <h2>Your Badges</h2>
    <!-- RadarChart -->
    <RadarChart :chartData="radarData" :chartOptions="radarOptions" />

    <div class="badge-list">
      <div class="badge-item" v-for="(badge, index) in badges" :key="index">
        <div class="badge-logo">
          <img />
        </div>
        <div class="badge-info">
          <h3>{{ badge.name }}</h3>
          <p>{{ badge.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RadarChart from "@components/PentagonChart.vue";

export default {
  name: "Badges",
  components: {
    RadarChart,
  },
  data() {
    return {
      radarData: {
        labels: [], // Hobby użytkownika
        datasets: [
          {
            label: "Your hobbies",
            data: [],
            fill: true,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgb(54, 162, 235)",
            pointBackgroundColor: "rgb(54, 162, 235)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(54, 162, 235)",
          },
        ],
      },
      radarOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
        },
      },
      badges: [
        { name: "Badge 1", description: "Description for Badge 1" },
        { name: "Badge 2", description: "Description for Badge 2" },
      ],
    };
  },
  mounted() {
    this.loadUserHobbies();
  },
  methods: {
    loadUserHobbies() {
      const userHobbies = JSON.parse(localStorage.getItem("userHobbies"));
      if (userHobbies && userHobbies.length === 5) {
        this.radarData.labels = userHobbies.map((hobby) => `#${hobby}`);
        this.radarData.datasets[0].data = userHobbies.map(() =>
          Math.floor(Math.random() * 50) + 10
        );
      } else {
        console.error("Hobbies not found or invalid");
      }
    },
  },
};
</script>


<style scoped>
.badges {
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

.RadarChart {
  max-width: 600px;
  width: 100%;
  margin-top: 2rem;
}

.badge-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-top: 2rem;
}

.badge-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.badge-logo {
  width: 80px;
  height: 80px;
  background-color: #ccc; /* Szare tło dla logo */
  border-radius: 50%;
  margin-bottom: 0.5rem;
}

.badge-info h3 {
  font-size: 1rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.badge-info p {
  font-size: 0.9rem;
  color: #666;
}
</style>
