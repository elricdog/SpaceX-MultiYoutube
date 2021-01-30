// Set the configuration for your app
 // TODO: Replace with your project's config object
var config = {
 apiKey: "AIzaSyDF-bCz0fuvpWEBFYN9l6uqtunG-gN_lRI",
 authDomain: "spacexboard.firebaseapp.com",
 databaseURL: "https://spacexboard-default-rtdb.firebaseio.com/",
 storageBucket: "bucket.appspot.com"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

function addView(){
  firebase.database().ref('views').set({
    counter: 1
  });
}
