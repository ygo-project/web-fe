import { createRouter, createWebHistory } from "vue-router";

const routes = [
	{
		path: '/',
		name: 'root',
		component: () => import("@/pages/RootPage.vue")
	},
	{
		path: '/duel',
		name: 'duel',
		component: () => import("@/pages/Duel/DuelPage.vue")
	},
	{
		path: '/rating',
		name: 'rating',
		component: () => import("@/pages/Rating/RatingPage.vue")
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes
});

export { router }
