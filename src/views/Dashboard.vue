<template>
	<div class="dashboard">
		<v-snackbar v-model="snackbar" :timeout="4000" top color="success">
			<span>You added a new Project</span>
			<v-btn text color="white" @click="snackbar = false">Close</v-btn>
		</v-snackbar>
		<h1 class="title grey--text">Dashboard</h1>
		<v-container class="my-5">
			<v-row class="mb-3">
				<v-col class="col-auto">
					<v-tooltip top color="success">
						<template v-slot:activator="{ on }">
							<v-btn
								small
								text
								class="success--text"
								v-on="on"
								@click="sortBy('title')"
							>
								<v-icon left small>mdi-folder</v-icon>
								<span class="caption text-capitalize"
									>By Project Name</span
								>
							</v-btn>
						</template>
						<span>Sort by project name</span>
					</v-tooltip>
					<v-tooltip top color="primary">
						<template v-slot:activator="{ on }">
							<v-btn
								small
								text
								class="primary--text"
								v-on="on"
								@click="sortBy('person')"
							>
								<v-icon left small>mdi-account</v-icon>
								<span class="caption text-capitalize"
									>By User</span
								>
							</v-btn>
						</template>
						<span>Sort by user</span>
					</v-tooltip>
				</v-col>
				<v-col class="col-auto ml-auto">
					<Popup @projectAdded="snackbar = true" />
				</v-col>
			</v-row>

			<v-card flat v-for="project in projects" :key="project.id">
				<v-row :class="`pa-3 project ${project.status}`">
					<v-col xs12 md6>
						<div class="caption grey--text">Project Title</div>
						<div>{{ project.title }}</div>
					</v-col>
					<v-col sm4 md2>
						<div class="caption grey--text">Person</div>
						<div>{{ project.person }}</div>
					</v-col>
					<v-col sm4 md2>
						<div class="caption grey--text">Due by</div>
						<div>{{ project.due }}</div>
					</v-col>
					<v-col sm4 md2>
						<v-chip
							small
							active
							:class="
								`${project.status} white--text caption my-2`
							"
							>{{ project.status }}</v-chip
						>
					</v-col>
				</v-row>
				<v-divider></v-divider>
			</v-card>
		</v-container>
	</div>
</template>

<script>
import Popup from "../components/Popup";
import db from "../firebase";

export default {
	name: "dashboard",
	components: { Popup },
	data() {
		return {
			projects: [],
			snackbar: false
		};
	},
	methods: {
		sortBy(prop) {
			this.projects.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
		}
	},
	created() {
		// Realtime Firebase Listener
		db.collection("projects").onSnapshot(res => {
			const changes = res.docChanges();

			changes.forEach(change => {
				if (change.type === "added") {
					this.projects.push({
						...change.doc.data(),
						id: change.doc.id
					});
				}
			});
		});
	}
};
</script>

<style scoped>
.project.complete {
	border-left: 4px solid #3cd1c2;
}
.project.ongoing {
	border-left: 4px solid orange;
}
.project.overdue {
	border-left: 4px solid tomato;
}
.v-chip.complete {
	background: #3cd1c2;
}
.v-chip.ongoing {
	background: orange;
}
.v-chip.overdue {
	background: tomato;
}
</style>
