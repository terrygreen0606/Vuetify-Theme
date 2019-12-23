const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const addAdminRole = functions.https.onCall((data, context) => {
	// check if the request is made by an admin
	if (context.auth.token.admin !== true) {
		return { error: "Only Admins can add other admins." };
	}
	// get user and add custom claims (admin)
	return admin
		.auth()
		.getUserByEmail(data.email)
		.then(user => {
			return admin.auth().setCustomUserClaims(user.uid, {
				admin: true
			});
		})
		.then(() => {
			return {
				message: `Success! ${data.email} has become an admin.`
			};
		})
		.catch(err => {
			return err;
		});
});

const listAllUsers = functions.https.onCall((data, context) => {
	if (context.auth.token.admin !== true) {
		return { error: "Only Admins can see other admins." };
	}

	function listAllUsers(nextPageToken) {
		// List batch of users, 1000 at a time.
		return admin
			.auth()
			.listUsers(1000, nextPageToken)
			.then(function(listUsersResult) {
				if (listUsersResult.pageToken) {
					// List next batch of users.
					listAllUsers(listUsersResult.pageToken);
				}
				return listUsersResult.users;
			})
			.catch(function(error) {
				return error;
			});
	}

	return listAllUsers();
});
exports.addAdminRole = addAdminRole;
exports.listAllUsers = listAllUsers;
