import { defineStore } from 'pinia';
import router from '../router';

export const weatherDataStore = defineStore('weather', {
  state: () => ({
    cityData: null,
    weatherData: null,
    cityDataLoading: false,
    weatherDataLoading: false,
    weatherDataError: false,
    currentCity: null,
    currentCountry: null,
    currentWeek: 0,
    lat: null,
    lon: null,
    tempUnit: `celsius`,
    windUnit: `kmh`,
    precipUnit: `mm`,
    weatherMapping: {
      0: { label: "Sunny", icon: "sunny" },
  
      // Partly Cloudy
      1: { label: "Mainly Clear", icon: "partly-cloudy" },
      2: { label: "Partly Cloudy", icon: "partly-cloudy" },
      
      // Overcast
      3: { label: "Overcast", icon: "overcast" },
      
      // Fog
      45: { label: "Fog", icon: "fog" },
      48: { label: "Depositing Rime Fog", icon: "fog" },
      
      // Drizzle (毛毛雨)
      51: { label: "Light Drizzle", icon: "drizzle" },
      53: { label: "Moderate Drizzle", icon: "drizzle" },
      55: { label: "Dense Drizzle", icon: "drizzle" },
      56: { label: "Light Freezing Drizzle", icon: "drizzle" },
      57: { label: "Dense Freezing Drizzle", icon: "drizzle" },
      
      // Rain
      61: { label: "Slight Rain", icon: "rain" },
      63: { label: "Moderate Rain", icon: "rain" },
      65: { label: "Heavy Rain", icon: "rain" },
      66: { label: "Light Freezing Rain", icon: "rain" },
      67: { label: "Heavy Freezing Rain", icon: "rain" },
      80: { label: "Slight Rain Showers", icon: "rain" },
      81: { label: "Moderate Rain Showers", icon: "rain" },
      82: { label: "Violent Rain Showers", icon: "rain" },
      
      // Snow
      71: { label: "Slight Snow Fall", icon: "snow" },
      73: { label: "Moderate Snow Fall", icon: "snow" },
      75: { label: "Heavy Snow Fall", icon: "snow" },
      77: { label: "Snow Grains", icon: "snow" },
      85: { label: "Slight Snow Showers", icon: "snow" },
      86: { label: "Heavy Snow Showers", icon: "snow" },
      
      // Storm
      95: { label: "Thunderstorm", icon: "storm" },
      96: { label: "Thunderstorm with Hail", icon: "storm" },
      99: { label: "Thunderstorm with Heavy Hail", icon: "storm" }
    }
  }),
  actions: {
    async fetchCityList(name) {
      this.cityDataLoading = true;
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=5&language=en&format=json`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        this.cityData = data.results || [];
      } catch(error) {
        this.cityDataError = true;
        console.log(error);
        router.push('/error');
      } finally {
        this.cityDataLoading = false;
      }
    },
    async fetchWeatherData(city, country) {
      this.weatherDataLoading = true;
      const URL = `https://api.open-meteo.com/v1/forecast?latitude=${this.lat}&longitude=${this.lon}`
                + `&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m,weather_code`
                + `&daily=temperature_2m_max,temperature_2m_min,weather_code`
                + `&hourly=temperature_2m,weather_code`
                + `&timezone=auto`
                + `&temperature_unit=${this.tempUnit}`
                + `&wind_speed_unit=${this.windUnit}`
                + `&precipitation_unit=${this.precipUnit}`;
      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        this.weatherData = data;
        this.currentCity = city;
        this.currentCountry = country;
        this.weatherDataLoading = false;
      } catch(error) {
        this.weatherDataError = true;
        router.push('/error')
      } finally {
        this.weatherDataLoading = false;
      }
    }
  },
  getters: {
    dailyHourlyForecast(state) {
      if (!state.weatherData?.hourly) return [];
      const hourly = state.weatherData.hourly;
      const days = [];
      const now = new Date();
      const currenthour = now.getHours();

      for (let i = 0; i < 7; i++) {
        const start = i * 24;
        const end = start + 24;

        let hourlyChunk = hourly.time.slice(start, end).map((time, idx) => {
          const actualIdx = start + idx;
          return {
            time: time,
            temp: hourly.temperature_2m[actualIdx],
            code: hourly.weather_code[actualIdx],
          }
        }); 

        if (i === 0) {
          hourlyChunk = hourlyChunk.filter(h => {
            const forecastHour = new Date(h.time).getHours();
            return forecastHour >= currenthour;
          })
        }

        days.push({
          date: state.weatherData.daily.time[i],
          hourly: hourlyChunk,
        });
      }
      return days;
    }
  }
})