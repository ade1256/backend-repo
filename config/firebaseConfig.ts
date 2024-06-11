import admin from "firebase-admin";
import serviceAccount from "./backend-test-ebuddy-ade-firebase-adminsdk-zot8z-6ddedac4fb.json";
import dotenv from "dotenv";
dotenv.config();

const serviceAccountCredentials = serviceAccount as any;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountCredentials),
});

const db = admin.firestore();

const firestoreEmulatorHost = "localhost";
db.settings({
  host: firestoreEmulatorHost,
  port: 8080,
  ssl: false,
});
export { admin, db };
