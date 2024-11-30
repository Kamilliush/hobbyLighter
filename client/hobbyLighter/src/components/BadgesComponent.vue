<template>
    <div class="badges">
      <h2>Your Badges</h2>
      <!-- RadarChart -->
      <RadarChart :chartData="radarData" :chartOptions="radarOptions" />
  
      <!-- Lista badge'ów -->
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
  import RadarChart from "@components/PentagonChart.vue";  // Upewnij się, że ścieżka jest poprawna
  
  export default {
    name: "Badges",
    components: {
      RadarChart,
    },
    data() {
      return {
        radarData: {
          labels: ["#cars", "#fishing", "#it", "#beer", "#running"],
          datasets: [
            {
              label: "Your hobbies",
              data: [50, 45, 15, 35, 30],
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
            tooltip: {
              enabled: false,
            },
          },
        },
        badges: [
          { name: "Badge 1", description: "Description for Badge 1" },
          { name: "Badge 2", description: "Description for Badge 2" },
          { name: "Badge 3", description: "Description for Badge 3" },
          { name: "Badge 4", description: "Description for Badge 4" },
          { name: "Badge 5", description: "Description for Badge 5" },
          { name: "Badge 6", description: "Description for Badge 6" },
          { name: "Badge 7", description: "Description for Badge 7" },
          { name: "Badge 8", description: "Description for Badge 8" },
        ],
      };
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
  