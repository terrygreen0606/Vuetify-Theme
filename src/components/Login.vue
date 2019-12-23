<template>
	<v-container>
		<v-row justify="center" no-gutters>
			<v-col cols="6">
				<v-form ref="form" v-model="login">
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
						:loading="loading"
						block
						@click.prevent="submit"
					>
						Log In
					</v-btn>
					<v-alert type="warning" v-if="alert">
						{{ alertMsg }}
					</v-alert>
				</v-form>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { auth } from "../firebase";
import router from "../router";

export default {
	data: () => ({
		login: true,
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
				auth.signInWithEmailAndPassword(this.email, this.password)
					.then(() => {
						this.loading = false;
						router.push("/dashboard");
						this.$refs.form.reset();
						this.alert = false;
					})
					.catch(err => {
						this.alert = true;
						this.loading = false;
						this.alertMsg = err.message;
					});
			}
		}
	}
};
</script>

<style></style>
