<script setup>
  import logo from "../assets/images/logo.svg"
  import units from "../components/units/units.vue"
  import retryIcon from "../assets/images/icon-retry.svg"
  import errorIcon from "../assets/images/icon-error.svg"
  import router from "../router"
  const backHome = () => {
    router.push('/');
  };
</script>
  
<template>
  <div class="appContainer">
    <header>
        <img :src="logo" alt="Logo" class="logo"/>
        <units />
    </header>
    <main class="error">
      <img :src="errorIcon" alt="errorIcon" class="errorIcon">
      <h1>Something went wrong</h1>
      <p>We couldn't connect to the server (API error). Please try again in a few momnets</p>
      <button class="retryButton" type="button" @click="backHome">
        <img :src="retryIcon" alt="retryIcon" class="retryIcon">
        <span>Retry</span>
      </button>
    </main>
  </div>
</template>

<style scoped>
  @import "./error.css"
</style>
