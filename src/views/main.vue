<script setup>
  import logo from "../assets/images/logo.svg"
	import units from "../components/units/units.vue"
  import search from "../components/search/search.vue"
  import weatherState from "../components/weatherState/weatherState.vue";
  import dailyPanel from "../components/dailyPanel/dailyPanel.vue";
  import hourlyPanel from "../components/hourlyPanel/hourlyPanel.vue";
  import router from "../router"
</script>

<template>
  <div class="appContainer">
    <header>
      <img :src="logo" alt="Logo" class="logo"/>
      <units />
    </header>
    <main>
      <h1>How's the sky looking today?</h1>
      <search class="search-box"/>
      <weatherState class="current-weather"/>
      <dailyPanel class="weekly-forecast"/>
      <hourlyPanel class="hourly-forecast"/>
    </main>
  </div>
</template>

<style scoped>
  @import "./main.css"
</style>