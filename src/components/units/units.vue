<script setup>
	import units from "../../assets/images/icon-units.svg";
	import dropdown from "../../assets/images/icon-dropdown.svg";
	import checkmark from "../../assets/images/icon-checkmark.svg";
	import { weatherDataStore } from "../../stores/dataStore";
	import { ref } from 'vue';

	const menuOpen = ref(false);
	const temperature = ref("celsius");
	const windSpeed = ref("kmh");
	const precipitation = ref("mm");
	const stores = weatherDataStore();
	const toggleMenu = () => {
		menuOpen.value = !menuOpen.value;
	}	
	const choiceCel = () => {
		temperature.value = "celsius";
		if (stores.tempUnit !== "celsius") {
			stores.tempUnit = "celsius";
			stores.fetchWeatherData(stores.currentCity, stores.currentCountry);
		}
	}
	const choiceFah = () => {
		temperature.value = "fahrenheit";
		if (stores.tempUnit !== "fahrenheit") {
			stores.tempUnit = "fahrenheit";
			stores.fetchWeatherData(stores.currentCity, stores.currentCountry);
		}
	}
	const choiceKmh = () => {
		windSpeed.value = "kmh";
		if (stores.windUnit !== "kmh") {
			stores.windUnit = "kmh";
			stores.fetchWeatherData(stores.currentCity, stores.currentCountry);
		}
	}
	const choiceMph = () => {
		windSpeed.value = "mph";
		if (stores.windUnit !== "mph") {
			stores.windUnit = "mph";
			stores.fetchWeatherData(stores.currentCity, stores.currentCountry);
		}
	}
	const choiceMm = () => {
		precipitation.value = "mm";
		if (stores.precipUnit !== "mm") {
			stores.precipUnit = "mm";
			stores.fetchWeatherData(stores.currentCity, stores.currentCountry);
		}
	}
	const choiceIn = () => {
		precipitation.value = "in";
		if (stores.precipUnit !== "inch") {
			stores.precipUnit = "inch";
			stores.fetchWeatherData(stores.currentCity, stores.currentCountry);
		}
	}
	const switchToImperial = () => {
		choiceFah();
		choiceMph();
		choiceIn();
	}
	
</script>



<template>
  <div class="container">
    <button class="units" type="button" @click="toggleMenu()">
        <img :src="units" alt="units" class="icon" >
        <p>Units</p>
        <img :src="dropdown" alt="dropdown" class="dropdown" >
    </button>
		<div class="menu" :class="{ isHidden: !menuOpen}">
  		<button class="option switchToImperial" type="button" @click="switchToImperial">Switch to Imperial</button>
			<div class="options-list"> 
				
				<div class="Temperature unit-option">
					<p class="title">Temperature</p>
					<button class="option" type="button" :class="{ check: temperature === 'celsius' }" @click="choiceCel">
						<p>Celsius (°C)</p>
						<img :src="checkmark" alt="checkmark" class="checkmark" :class="{ isHidden: temperature !== 'celsius'}">
					</button>
					<button class="option" type="button" :class="{ check: temperature === 'fahrenheit' }" @click="choiceFah">
						<p>Fahrenheit (°F)</p>
						<img :src="checkmark" alt="checkmark" class="checkmark" :class="{ isHidden: temperature !== 'fahrenheit' }">
					</button>
				</div>

				<div class="divider"></div>

				<div class="windSpeed unit-option">
					<p class="title">Wind Speed</p>
					<button class="option" type="button" :class="{ check: windSpeed === 'kmh' }" @click="choiceKmh">
						<p>km/h</p>
						<img :src="checkmark" alt="checkmark" class="checkmark" :class="{ isHidden: windSpeed !== 'kmh' }">
					</button>
					<button class="option" type="button" :class="{ check: windSpeed === 'mph' }" @click="choiceMph">
						<p>mph</p>
						<img :src="checkmark" alt="checkmark" class="checkmark" :class="{ isHidden: windSpeed !== 'mph' }">
					</button>
				</div>

				<div class="divider"></div>

				<div class="precipitation unit-option">
					<p class="title">Precipitation</p>
					<button class="option" type="button" :class="{ check: precipitation === 'mm' }" @click="choiceMm">
						<p>Millimeters (mm)</p>
						<img :src="checkmark" alt="checkmark" class="checkmark" :class="{ isHidden: precipitation !== 'mm' }">
					</button>
					<button class="option" type="button" :class="{ check: precipitation === 'in' }" @click="choiceIn">
						<p>Inches (in)</p>
						<img :src="checkmark" alt="checkmark" class="checkmark" :class="{ isHidden: precipitation !== 'in' }">
					</button>
				</div>

			</div>
		</div>
  </div>
</template>

<style scoped>
	@import './units.css'
</style>