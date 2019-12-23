<template>
    <v-dialog max-width="600px" v-model="dialog">
        <template v-slot:activator="{ on }">
            <v-btn color="success" v-on="on">Add new Project</v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">Add New Project</span>
            </v-card-title>
            <v-card-text>
                <v-form class="px-3" ref="form">
                    <v-text-field
                        label="Title"
                        v-model="title"
                        prepend-icon="mdi-subtitles-outline"
                        :rules="rules"
                    ></v-text-field>
                    <v-textarea
                        label="Content"
                        v-model="content"
                        prepend-icon="mdi-pencil"
                        :rules="rules"
                    ></v-textarea>
                    <v-menu max-width="290">
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                label="Due Date"
                                prepend-icon="mdi-calendar-range"
                                :value="due"
                                v-on="on"
                                :rules="rules"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="due"></v-date-picker>
                    </v-menu>

                    <v-btn
                        text
                        class="success mx-0 mt-3"
                        @click.prevent="submit"
                        :loading="loading"
                    >Add Project</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import { db } from "../firebase";

export default {
    props: ["project"],
    data() {
        return {
            title: "",
            content: "",
            due: null,
            rules: [
                v => !!v || "This field is required",
                v => (v && v.length >= 6) || "Minimum length is 6 characters."
            ],
            loading: false,
            dialog: false
        };
    },
    methods: {
        submit() {
            // I gave ref value in v-form
            if (this.$refs.form.validate()) {
                this.loading = true;
                const project = {
                    title: this.title,
                    content: this.content,
                    due: this.due,
                    person: "Terry",
                    status: "ongoing"
                };

                db.collection("projects")
                    .add(project)
                    .then(() => {
                        this.loading = false;
                        this.dialog = false;
                        this.$refs.form.reset();
                        this.$emit("projectAdded");
                    })
                    .catch(err => console.log(err));
            }
        }
    }
};
</script>

<style></style>
