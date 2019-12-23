<template>
	<div class="users">
		<h2>Users Table</h2>
		<v-container class="my-5">
			<v-card class="pa-3">
				<v-row no-gutters>
					<v-col>
						<div>Email</div>
					</v-col>
					<v-col>
						<div>Created At</div>
					</v-col>
					<v-col>
						<div>Type</div>
					</v-col>
					<v-col align="center" v-if="admin">
						<div>Action</div>
					</v-col>
				</v-row>
			</v-card>

			<v-card v-for="user in users" :key="user.id">
				<v-row no-gutters class="pa-3">
					<v-col>
						<div>{{ user.email }}</div>
					</v-col>
					<v-col>
						<div>{{ user.createdAt }}</div>
					</v-col>
					<v-col>
						<div>{{ user.type }}</div>
					</v-col>
					<v-col align="center" v-if="admin">
						<v-tooltip bottom color="success">
							<template v-slot:activator="{ on }">
								<v-btn
									text
									v-on="on"
									@click="addAdminRole(user.email)"
									:loading="user.loading.loading"
								>
									<v-icon>mdi-pencil-outline</v-icon>
								</v-btn>
							</template>
							<span>Make admin or user</span>
						</v-tooltip>

						<v-tooltip bottom color="error">
							<template v-slot:activator="{ on }">
								<v-btn text v-on="on">
									<v-icon>mdi-delete-forever-outline</v-icon>
								</v-btn>
							</template>
							<span>Delete this user</span>
						</v-tooltip>
					</v-col>
				</v-row>
				<v-divider></v-divider>
			</v-card>
		</v-container>
	</div>
</template>

<script>
import moment from "moment";
import { auth, functions } from "../firebase";
import router from "../router";

export default {
	data() {
		return {
			admin: false,
			users: []
		};
	},
	created() {
		auth.onAuthStateChanged(user => {
			if (user) {
				// Check if the loggedin user is admin or not
				// returns true or undefined
				user.getIdTokenResult().then(idTokenResult => {
					this.admin = idTokenResult.claims.admin;
					if (idTokenResult.claims.admin) {
						const listUsers = functions.httpsCallable(
							"listAllUsers"
						);

						listUsers().then(result => {
							if (result.data === null) {
								console.log("error occurred on loading users");
							}
							console.log(result.data);
							result.data.forEach(user => {
								let type = null;
								user.customClaims
									? (type = "Admin")
									: (type = "User");
								this.users.push({
									...user,
									createdAt: moment(
										user.metadata.creationTime
									).format("YYYY [/] MM [/] DD"),
									type,
									loading: {
										email: user.email,
										loading: false
									}
								});
							});
						});
					} else {
						console.log("you are not an admin.");
					}
				});
			} else {
				if (window.location.pathname !== "/") {
					router.push("/");
				}
			}
		});
	},
	methods: {
		addAdminRole(email) {
			this.users.forEach(user => {
				if (user.loading.email === email) {
					return (user.loading.loading = true);
				}
			});
			// from functions/index
			const addFunction = functions.httpsCallable("addAdminRole");
			addFunction({ email }).then(result => {
				console.log(result);
				this.users.forEach(user => {
					if (user.loading.email === email) {
						return (user.loading.loading = false);
					}
				});
			});
		}
	}
};
</script>

<style></style>
