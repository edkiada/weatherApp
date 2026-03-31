<script setup>
  import searchIcon from "../../assets/images/icon-search.svg";
  import { weatherDataStore } from "../../stores/dataStore";
  import { ref, watch } from 'vue';
  
  const stores = weatherDataStore();
  const searchQuery = ref('');
  const City = ref("");
  const Country = ref("");
  let timer = null;

  watch(searchQuery, (newVal) => {
    clearTimeout(timer);

    if (!newVal) {
      stores.cityData = [];
      return;
    }
    timer = setTimeout(() => {
      stores.fetchCityList(newVal);
      console.log('test')
    }, 500);
  });

  const choiceCity = (name, country, lat, lon) => {
    searchQuery.value = `${name} (${country})`;
    City.value = name;
    Country.value = country;
    stores.lat = lat;
    stores.lon = lon;
    stores.cityData = [];
  }

  const getDataFromCity = () => {
    console.log(City.value);
    stores.fetchWeatherData(City.value, Country.value);
  };
</script>

<template>
  <div class="search-container">
    <div class="searchField">
      <img :src="searchIcon" alt="searchIcon" class="searchIcon">
      <input class="field" v-model="searchQuery" placeholder="Search for a place..." />
      <div v-if="stores.cityData && stores.cityData.length > 0" class="cityList-container">
        <div v-for="city in stores.cityData" :key="city.id">
        <button class="cityItem" type="button" @click="choiceCity(city.name, city.country, city.latitude, city.longitude)" >{{ city.name }} ({{ city.country }})</button>
      </div>
      </div>
    </div>
    <button class="searchButton" type="button" @click="getDataFromCity">Search</button>
  </div>
</template>

<style scoped>
  @import "./search.css"
</style>