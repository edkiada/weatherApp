import { createRouter, createWebHistory } from "vue-router";
import weatherApp from "../views/main.vue";
import weatherAppError from "../views/error.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: weatherApp
  },
  {
		path: "/error",
		name: "error",
		component: weatherAppError
	}      
];

const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;