<script setup>
  import { weatherDataStore } from '../../stores/dataStore';

  const stores = weatherDataStore();

  const formatWeatherData = (rawDate) => {
    if (!rawDate) {
      return "";
    }
    const date = new Date(rawDate);

    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
    }).format(date)
  }
</script>

<template>
  <div class="dailyForecast">
    <p>Daily forecast</p>
    <div class="panel" v-if="stores.weatherDataLoading">
      <div v-for="n in 7" class="panelItem"></div>
    </div>
    <div class="panel" v-else-if="!stores.weatherData">
      <div v-for="n in 7" class="panelItem"></div>
    </div>
    <div class="panel" v-else>
      <div
        v-for="(date, index) in stores.weatherData.daily.time"
        :key="date"
        class="panelItem"
      >
        <p>{{ formatWeatherData(stores.weatherData.daily.time[index]) }}</p>
        <img :src="`icons/icon-${stores.weatherMapping[stores.weatherData.daily.weather_code[index]]?.icon}.webp`" alt="weatherIcon" class="weatherIcon">
        <div class="temperature">
          <p>{{ Math.round(stores.weatherData.daily.temperature_2m_max[index]) }}°</p>
          <p>{{ Math.round(stores.weatherData.daily.temperature_2m_min[index]) }}°</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  @import "./dailyPanel.css"
</style>