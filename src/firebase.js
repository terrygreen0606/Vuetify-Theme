import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
	apiKey: "AIzaSyDNUSPAMTi8Hw178iAweXazPlVS64PcmnA",
	authDomain: "vuetify-app-c520d.firebaseapp.com",
	databaseURL: "https://vuetify-app-c520d.firebaseio.com",
	projectId: "vuetify-app-c520d",
	storageBucket: "vuetify-app-c520d.appspot.com",
	messagingSenderId: "680989686048",
	appId: "1:680989686048:web:c427e9788b4d2187a87f45",
	measurementId: "G-4TFHV1G1CG"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const db = firebase.firestore();

export default db;
