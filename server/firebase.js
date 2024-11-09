const admin = require("firebase-admin");
const path = require("path");

// Path to the service account key file
const serviceAccount = path.join(__dirname, "coolproject-9a3e2-firebase-adminsdk-gs9o4-16dd04fb4f.json");

// Initialize Firebase Admin SDK with the service account
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount), // Use the service account to authenticate
});

// Get a Firestore instance
const db = admin.firestore();

// Export the Firestore instance for use in other parts of the app
module.exports = db;