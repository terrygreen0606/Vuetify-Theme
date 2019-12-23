<template>
	<v-container>
		<v-row justify="center" no-gutters>
			<v-col cols="6">
				<v-form ref="form" v-model="signup">
					<v-text-field
						v-model="name"
						:rules="nameRules"
						label="Name"
						required
					></v-text-field>
					<v-text-field
						v-model="email"
						:rules="emailRules"
						label="E-mail"
						required
					></v-text-field>
					<v-text-field
						type="password"
						v-model="password"
						:rules="nameRules"
						label="Password"
						required
					></v-text-field>
					<v-btn
						raised
						block
						@click.prevent="submit"
						:loading="loading"
						>Sign Up</v-btn
					>
					<v-alert type="warning" v-if="alert">
						{{ alertMsg }}
					</v-alert>
				</v-form>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { auth, db } from "../firebase";
import router from "../router";

export default {
	data: () => ({
		signup: true,
		name: "",
		password: "",
		email: "",
		loading: false,
		alert: false,
		alertMsg: "",

		nameRules: [v => !!v || "This field is required"],
		emailRules: [
			v => !!v || "E-mail is required",
			v => /.+@.+\..+/.test(v) || "E-mail must be valid"
		]
	}),

	methods: {
		submit() {
			if (this.$refs.form.validate()) {
				this.loading = true;
				auth.createUserWithEmailAndPassword(this.email, this.password)
					.then(res => {
						// Create Users collection with the user id
						return db
							.collection("users")
							.doc(res.user.uid)
							.set({
								name: this.name
							})
							.then(() => {
								this.loading = false;
								router.push("/dashboard");
								this.$refs.form.reset();
								this.alert = false;
							});
					})
					.catch(err => {
						this.loading = false;
						this.alert = true;
						this.alertMsg = err.message;
					});
			}
		}
	}
};
</script>

<style></style>
