import { createRouter, createWebHistory } from "vue-router";

const routes = [
	{
		path: '/',
		name: 'root',
		component: () => import("@/pages/RootPage.vue")
	},
	// {
	// 	path: '/first',
	// 	name: 'first',
	// 	component: () => import("@/pages/first.vue")
	// },
]

const router = createRouter({
	history: createWebHistory(),
	routes
});

export { router }