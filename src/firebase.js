// import app from "firebase/app";
// import "firebase/firestore";
// import "firebase/auth";


// //  Update the config
// var firebaseConfig = {
//   apiKey: "AIzaSyDVU6KtfZIYg2hdFBpwSBzH0egKvIVSG10",
//   authDomain: "short-link-72612.firebaseapp.com",
//   projectId: "short-link-72612",
//   storageBucket: "short-link-72612.appspot.com",
//   messagingSenderId: "277697290109",
//   appId: "1:277697290109:web:14715d811985714927f614"
// };

// const firebase = app.initializeApp(firebaseConfig);
// const firestore = app.firestore();
// const auth = app.auth();


// // Uncomment the following if you want to use emulator
// // if (process.env.NODE_ENV === "development") {
// //   firestore.useEmulator("localhost", 8080);
// //   auth.useEmulator("http://localhost:9099");
// // }

// export { firebase, firestore, auth, app };

import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// initializeApp.firestore.FieldValue.serverTimestamp
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVU6KtfZIYg2hdFBpwSBzH0egKvIVSG10",
  authDomain: "short-link-72612.firebaseapp.com",
  projectId: "short-link-72612",
  storageBucket: "short-link-72612.appspot.com",
  messagingSenderId: "277697290109",
  appId: "1:277697290109:web:14715d811985714927f614"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
// const usersCollection = collection(firestore, "users");
const usersCollection = (...collectionPath) => {
  return collection(firestore, "users", ...collectionPath);
};
// if (process.env.NODE_ENV === 'development') {
//   connectFirestoreEmulator(firestore, 'localhost', 8080);
//   connectAuthEmulator(auth, 'http://localhost:4000');
// }
// const serverTimestamp = getFirestore().FieldValue.serverTimestamp;

// Create a firebase object to export
const firebase = {
  app: firebaseApp,
  firestore: firestore,
  auth: auth,
  usersCollection: usersCollection,
};

export {
  firebaseApp, firestore, auth, usersCollection, firebase
};


