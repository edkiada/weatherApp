<script setup>
  import dropDown from "../../assets/images/icon-dropdown.svg";
  import { weatherDataStore } from "../../stores/dataStore";
  import { ref } from 'vue';

  const stores = weatherDataStore();
  const dropDownOpen = ref(false);
  const formatWeekData = (rawDate) => {
    if (!rawDate) {
      return "";
    }
    const date = new Date(rawDate);

    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
    }).format(date)
  }

  const formatHourlyData = (rawDate) => {
    if (!rawDate) {
      return "";
    }
    const date = new Date(rawDate);

    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      hour12: true,
    }).format(date)
  }

  const handleSelect = (index) => {
    stores.currentWeek = index;
    
    switchDropDownWindow();
  };

  const switchDropDownWindow = () => {
    dropDownOpen.value = !dropDownOpen.value;
  }
</script> 

<template>
  <div class="horlyPanel" v-if="stores.weatherDataLoading">
    <div class="setting">
      <p>Hourly forecast</p>
      <button class="dailyButton" type="button">
        <span>-</span>
        <img :src="dropDown" alt="dropIcon" class="dropIcon">
      </button>
    </div>
    <div class="panel" v-for="n in 8"></div>
  </div>
  <div class="horlyPanel" v-else-if="!stores.weatherData">
    <div class="setting">
      <p>Hourly forecast</p>
      <button class="dailyButton" type="button">
        <span>-</span>
        <img :src="dropDown" alt="dropIcon" class="dropIcon">
      </button>
    </div>
    <div class="panel" v-for="n in 8"></div>
  </div>
  <div class="horlyPanel" v-else>
    <div class="setting">
      <p>Hourly forecast</p>
      <div class="dailyContainer">
        <button class="dailyButton" type="button" @click="switchDropDownWindow">
          <span>{{ formatWeekData(stores.weatherData.daily.time[stores.currentWeek]) }}</span>
          <img :src="dropDown" alt="dropIcon" class="dropIcon">
        </button>
        <div class="dayList" v-if="dropDownOpen">
          <button type="button" v-for="day in 7" :key="day" class="weekButton" @click="handleSelect(day - 1)">{{ formatWeekData(stores.weatherData.daily.time[day - 1]) }}</button>
        </div>
      </div>
    </div>
    <div  class="hourlyContainer" v-if="stores.dailyHourlyForecast">
      <div v-for="hour in stores.dailyHourlyForecast[stores.currentWeek].hourly" class="hourlyPanel">
        <div class="hourlyPanelTitle">
          <img :src="`icons/icon-${stores.weatherMapping[hour.code]?.icon}.webp`" alt="weatherIcon" class="weatherIcon">
          <span>{{ formatHourlyData(hour.time) }}</span>
        </div>
        <p>{{ Math.round(hour.temp) }}°</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  @import "./hourlyPanel.css"
</style>