<script setup>
  import { weatherDataStore } from '../../stores/dataStore';

  const stores = weatherDataStore();

  const formatWeatherData = (rawDate) => {
    if (!rawDate) {
      return "";
    }
    const date = new Date(rawDate);

    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date)
  }
</script>

<template>
  <div class="seatherState">
    <div class="template">
      <div class="loading" v-if="stores.weatherDataLoading">
        <div class="loadingIcon">
          <div class="item"></div>
          <div class="item middleItem"></div>
          <div class="item"></div>
        </div>
        <p>Loading...</p>
      </div>
      <div class="loading" v-else-if="!stores.weatherData">
      </div>
      <div class="current" v-else>
        <div class="currentCityDate">
          <p class="city"><span class="city-text">{{ stores.currentCity }}</span> <span v-if="stores.currentCity !== stores.currentCountry" class="city-text">, {{ stores.currentCountry }}</span></p>
          <p class="date">{{ formatWeatherData(stores.weatherData.current.time) }}</p>
        </div>
        <div class="temperature">
          <img :src="`icons/icon-${stores.weatherMapping[stores.weatherData.current.weather_code]?.icon}.webp`" alt="weatherIcon" class="weatherIcon">
          <p>{{ stores.weatherData.current.temperature_2m }}°</p>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="panelItem">
        <p class="panelTitle">Feel Like</p>
        <p class="panelText" v-if="stores.weatherDataLoading">-</p>
        <p class="panelText" v-else-if="!stores.weatherData">-</p>
        <p class="panelText" v-else>{{ stores.weatherData.current.apparent_temperature }}°</p>
      </div>
      <div class="panelItem">
        <p class="panelTitle">Humidity</p>
        <p class="panelText" v-if="stores.weatherDataLoading">-</p>
        <p class="panelText" v-else-if="!stores.weatherData">-</p>
        <p class="panelText" v-else>{{ stores.weatherData.current.relative_humidity_2m }}%</p>
      </div>
      <div class="panelItem">
        <p class="panelTitle">Wind</p>
        <p class="panelText" v-if="stores.weatherDataLoading">-</p>
        <p class="panelText" v-else-if="!stores.weatherData">-</p>
        <p class="panelText" v-else-if="stores.windUnit === 'kmh'">{{ stores.weatherData.current.wind_speed_10m }} km/h</p>
        <p class="panelText" v-else>{{ stores.weatherData.current.wind_speed_10m }} mph</p>
      </div>
      <div class="panelItem">
        <p class="panelTitle">Precipitation</p>
        <p class="panelText" v-if="stores.weatherDataLoading">-</p>
        <p class="panelText" v-else-if="!stores.weatherData">-</p>
        <p class="panelText" v-else-if="stores.precipUnit === 'mm'">{{ stores.weatherData.current.precipitation }} mm</p>
        <p class="panelText" v-else>{{ stores.weatherData.current.precipitation }} in</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  @import './weatherState.css'
</style>