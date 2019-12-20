<template>
	<nav>
		<v-app-bar app flat class="grey lighten-5">
			<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
			<v-toolbar-title class="text-uppercase grey--text">
				<span class="font-weight-light">Todo</span>
				<span>Terry</span>
			</v-toolbar-title>
			<v-spacer></v-spacer>

			<!-- Dropdown menu -->
			<v-menu offset-y>
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
			<v-btn text>
				<span>Sign Out</span>
				<v-icon right>mdi-logout</v-icon>
			</v-btn>
		</v-app-bar>

		<v-navigation-drawer v-model="drawer" app class="green lighten-2">
			<v-row no-gutters>
				<v-col class="mt-5" align="center">
					<v-avatar size="100">
						<img src="/images/1.png" />
					</v-avatar>
					<p class="white--text subtitle mt-1">Terry</p>
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
						<v-list-item-title class="white--text">{{
							link.text
						}}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
	</nav>
</template>

<script>
export default {
	data() {
		return {
			drawer: false,
			links: [
				{ icon: "mdi-view-dashboard", text: "Dashboard", route: "/" },
				{ icon: "mdi-folder", text: "My Projects", route: "/projects" },
				{ icon: "mdi-account", text: "Team", route: "/team" }
			]
		};
	}
};
</script>

<style></style>
