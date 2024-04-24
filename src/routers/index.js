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
		path: '/fight',
		name: 'fight',
		component: () => import("@/pages/Fight/FightPage.vue")
	},
	{
		path: '/rating',
		name: 'rating',
		component: () => import("@/pages/Rating/RatingPage.vue")
	},
	{
		path: '/registry',
		name: 'registry',
		component: () => import("@/pages/Registry/RegistryPage.vue")
	},
	{
		path: '/league',
		name: 'league',
		component: () => import("@/pages/League/LeaguePage.vue")
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes
});

export { router }
