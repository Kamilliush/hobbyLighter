<template>
  <div>
    <canvas ref="radarChart"></canvas>
  </div>
</template>

<script>
import {
  RadarController,
  Chart,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default {
  name: "RadarChart",
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    chartOptions: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    chartData: {
      handler() {
        this.renderChart();
      },
      deep: true,
    },
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      if (this.chart) {
        this.chart.destroy();
      }
      this.chart = new Chart(this.$refs.radarChart, {
        type: "radar",
        data: this.chartData,
        options: this.chartOptions,
      });
    },
  },
};
</script>
