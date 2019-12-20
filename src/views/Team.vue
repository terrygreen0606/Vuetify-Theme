<template>
	<div class="team">
		<h1 class="title grey--text">Team</h1>
		<v-container class="my-5">
			<v-row>
				<v-col
					xs="12"
					sm="6"
					md="3"
					v-for="person in team"
					:key="person.name"
				>
					<v-card raised class="text-center">
						<v-avatar color="grey lighten-2" size="100">
							<img :src="person.avatar" />
						</v-avatar>
						<v-card-text>
							<div class="title">{{ person.name }}</div>
							<div class="grey--text">{{ person.role }}</div>
						</v-card-text>
						<v-card-actions>
							<v-btn text class="grey--text">
								<v-icon small left>mdi-message</v-icon>
								<span>Message</span>
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
export default {
	name: "team",
	data() {
		return {
			team: [
				{ name: "Terry", role: "Fullstack", avatar: "/images/1.png" },
				{ name: "Mike", role: "Front-end", avatar: "/images/2.png" },
				{ name: "Green", role: "Designer", avatar: "/images/3.png" },
				{ name: "John", role: "Back-end", avatar: "/images/4.png" },
				{ name: "Tom", role: "Back-end", avatar: "/images/5.png" }
			]
		};
	}
};
</script>

<style></style>
