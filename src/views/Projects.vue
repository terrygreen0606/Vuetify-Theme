<template>
    <div class="projects" v-if="isLogged">
        <h1 class="title grey--text">Projects</h1>
        <v-container class="my-5">
            <v-expansion-panels>
                <v-expansion-panel v-for="project in myProjects" :key="project.id">
                    <v-expansion-panel-header>{{project.title}}</v-expansion-panel-header>
                    <v-expansion-panel-content class="px-4 grey--text">
                        <div class="font-weight-bold">{{ project.due }}</div>
                        <div>{{ project.content }}</div>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-container>
    </div>
</template>

<script>
import { db, auth } from "../firebase";
import router from "../router";

export default {
    name: "projects",
    data() {
        return {
            projects: [],
            isLogged: false
        };
    },
    computed: {
        myProjects() {
            return this.projects.filter(project => {
                return project.person === "Terry";
            });
        }
    },
    created() {
        auth.onAuthStateChanged(user => {
            if (user) {
                this.isLogged = true;
                // Realtime Firebase Listener
                db.collection("projects").onSnapshot(
                    res => {
                        const changes = res.docChanges();

                        changes.forEach(change => {
                            if (change.type === "added") {
                                this.projects.push({
                                    ...change.doc.data(),
                                    id: change.doc.id
                                });
                            }
                        });
                    },
                    err => {
                        console.log(err.message);
                    }
                );
            } else {
                if (window.location.pathname !== "/") {
                    router.push("/");
                }
            }
        });
    }
};
</script>

<style></style>
