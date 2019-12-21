<template>
	<div class="dashboard">
		<v-snackbar v-model="snackbar" :timeout="4000" top color="success">
			<span>{{ message }}</span>
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
								<span class="caption text-capitalize">
									By Project Name
								</span>
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
								<span class="caption text-capitalize">
									By User
								</span>
							</v-btn>
						</template>
						<span>Sort by user</span>
					</v-tooltip>
				</v-col>
				<v-col class="col-auto ml-auto">
					<Popup
						@projectAdded="
							snackbar = true;
							message = 'You successfully added the new project';
						"
					/>
				</v-col>
			</v-row>

			<v-card class="titleTab pa-3">
				<v-row no-gutters>
					<v-col>
						<div>Project Title</div>
					</v-col>
					<v-col>
						<div>Person</div>
					</v-col>
					<v-col>
						<div>Due Date</div>
					</v-col>
					<v-col>
						<div>Status</div>
					</v-col>
					<v-col align="center">
						<div>Action</div>
					</v-col>
				</v-row>
			</v-card>

			<v-card v-for="project in projects" :key="project.id">
				<v-row no-gutters :class="`pa-3 project ${project.status}`">
					<v-col>
						<div>{{ project.title }}</div>
					</v-col>
					<v-col>
						<div>{{ project.person }}</div>
					</v-col>
					<v-col>
						<div>{{ project.due }}</div>
					</v-col>
					<v-col>
						<v-chip
							small
							:color="project.color"
							class="white--text my-2"
						>
							{{ project.status }}
						</v-chip>
					</v-col>
					<v-col align="center">
						<v-btn text>
							<v-icon>mdi-pencil-outline</v-icon>
						</v-btn>

						<v-btn
							text
							@click="
								deleteDialog = true;
								projectId = project.id;
							"
						>
							<v-icon>mdi-delete-forever-outline</v-icon>
						</v-btn>
					</v-col>
				</v-row>
				<v-divider></v-divider>
			</v-card>
			<v-dialog v-model="deleteDialog" max-width="600px">
				<v-card>
					<v-card-title class="headline">
						Are you sure to delete this project?
					</v-card-title>
					<v-card-actions>
						<v-spacer></v-spacer>

						<v-btn text @click="deleteDialog = false">
							Cancel
						</v-btn>
						<v-btn
							:loading="loading"
							text
							@click.prevent="deleteProject(projectId)"
						>
							Delete
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
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
			snackbar: false,
			deleteDialog: false,
			projectId: null,
			message: "",
			loading: false
		};
	},
	methods: {
		sortBy(prop) {
			this.projects.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
		},
		deleteProject(id) {
			this.loading = true;
			db.collection("projects")
				.doc(id)
				.delete()
				.then(() => {
					this.message = "You successfully deleted the project.";
					this.loading = false;
					this.deleteDialog = false;
				})
				.catch(err => console.log(err));
		}
	},
	created() {
		// Realtime Firebase Listener
		db.collection("projects").onSnapshot(res => {
			const changes = res.docChanges();

			changes.forEach(change => {
				if (change.type === "added") {
					let color = null;
					change.doc.data().status == "complete"
						? (color = "#3cd1c2")
						: "";
					change.doc.data().status == "ongoing"
						? (color = "orange")
						: "";
					change.doc.data().status == "overdue"
						? (color = "tomato")
						: "";
					this.projects.push({
						...change.doc.data(),
						id: change.doc.id,
						color
					});
				}
				if (change.type === "removed") {
					this.projects = this.projects.filter(
						project => project.id !== change.doc.id
					);
				}
			});
		});
	}
};
</script>

<style scoped>
.titleTab {
	border-left: 4px solid green;
}
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
