import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard.vue";
import Projects from "../views/Projects.vue";
import Team from "../views/Team.vue";
import Signup from "../components/Signup.vue";
import Login from "../components/Login.vue";
import Users from "../views/Users.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "home",
		component: Home
	},
	{
		path: "/dashboard",
		name: "dashboard",
		component: Dashboard
	},
	{
		path: "/projects",
		name: "projects",
		component: Projects
	},
	{
		path: "/team",
		name: "team",
		component: Team
	},
	{
		path: "/signup",
		name: "signup",
		component: Signup
	},
	{
		path: "/login",
		name: "login",
		component: Login
	},
	{
		path: "/users",
		name: "users",
		component: Users
	}
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
});

export default router;
