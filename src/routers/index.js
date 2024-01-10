import { createRouter, createWebHistory } from "vue-router";

const routes = [
	{
		path: '/',
		name: 'root',
		component: () => import("@/pages/RootPage.vue")
	},
	{
		path: '/calculator',
		name: 'calculator',
		component: () => import("@/pages/CalculatorPage.vue")
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes
});

export { router }
