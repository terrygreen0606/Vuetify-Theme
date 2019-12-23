<template>
	<nav>
		<v-app-bar app flat class="grey lighten-5">
			<v-app-bar-nav-icon
				@click="drawer = !drawer"
				v-if="loggedIn"
			></v-app-bar-nav-icon>
			<v-toolbar-title class="text-uppercase grey--text">
				<span class="font-weight-light">Projects of</span>
				<span>&nbsp;{{ user.name }}</span>
			</v-toolbar-title>
			<v-spacer></v-spacer>

			<v-toolbar-title v-if="loggedIn">{{ user.name }}</v-toolbar-title>
			<!-- Dropdown menu -->
			<v-menu offset-y v-if="loggedIn">
				<template v-slot:activator="{ on }">
					<v-btn text v-on="on">
						<v-icon left>mdi-chevron-down</v-icon>
						<span>Menu</span>
					</v-btn>
				</template>
				<v-list>
					<v-list-item
						v-for="(link, index) in links"
						:key="index"
						router
						:to="link.route"
					>
						<v-list-item-title>{{ link.text }}</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>

			<v-btn text router to="/login" v-if="loggedOut">
				<v-icon left>mdi-fingerprint</v-icon>
				<span>Log In</span>
			</v-btn>
			<v-btn text router to="/signup" v-if="loggedOut">
				<v-icon left>mdi-account-plus-outline</v-icon>
				<span>Sign Up</span>
			</v-btn>
			<v-btn text @click.prevent="signOut" v-if="loggedIn">
				<v-icon left>mdi-logout</v-icon>
				<span>Sign Out</span>
			</v-btn>
		</v-app-bar>

		<v-navigation-drawer v-model="drawer" app class="green lighten-2">
			<v-row no-gutters>
				<v-col class="mt-5" align="center">
					<v-avatar size="100">
						<img src="/images/1.png" />
					</v-avatar>
					<p class="white--text subtitle mt-1">{{ user.name }}</p>
				</v-col>
			</v-row>

			<v-list>
				<v-list-item
					v-for="link in links"
					:key="link.text"
					router
					:to="link.route"
				>
					<v-list-item-action>
						<v-icon class="white--text">{{ link.icon }}</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title class="white--text">
							{{ link.text }}
						</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
	</nav>
</template>

<script>
import { auth, db } from "../firebase";
import router from "../router";

export default {
	data() {
		return {
			drawer: false,
			loggedIn: false,
			loggedOut: false,
			links: [
				{
					icon: "mdi-view-dashboard",
					text: "Dashboard",
					route: "/dashboard"
				},
				{ icon: "mdi-folder", text: "My Projects", route: "/projects" },
				{ icon: "mdi-account", text: "Team", route: "/team" },
				{
					icon: "mdi-account-supervisor",
					text: "Users",
					route: "/users"
				}
			],
			user: {
				name: ""
			}
		};
	},
	methods: {
		signOut() {
			auth.signOut().then(() => {
				if (window.location.pathname !== "/") {
					router.push("/");
				}
			});
		}
	},
	created() {
		auth.onAuthStateChanged(user => {
			if (user) {
				db.collection("users")
					.doc(user.uid)
					.get()
					.then(doc => {
						this.user.name = doc.data().name;
						this.loggedIn = true;
						this.loggedOut = false;
					});
			} else {
				this.loggedIn = false;
				this.loggedOut = true;
			}
		});
	}
};
</script>

<style></style>
