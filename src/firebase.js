import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/functions";

var firebaseConfig = {
	apiKey: "AIzaSyDNUSPAMTi8Hw178iAweXazPlVS64PcmnA",
	authDomain: "vuetify-app-c520d.firebaseapp.com",
	databaseURL: "https://vuetify-app-c520d.firebaseio.com",
	projectId: "vuetify-app-c520d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const db = firebase.firestore();
const auth = firebase.auth();
const functions = firebase.functions();

export { db, auth, functions };
