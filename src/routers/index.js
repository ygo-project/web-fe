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
		path: '/singleFight',
		name: 'singleFight',
		component: () => import("@/pages/SingleFight/SingleFightPage.vue")
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
		path: '/candidate',
		name: 'candidate',
		component: () => import("@/pages/candidate/CandidatePage.vue")
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
