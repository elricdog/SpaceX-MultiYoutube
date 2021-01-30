var firebaseConfig = {
  apiKey: "AIzaSyDF-bCz0fuvpWEBFYN9l6uqtunG-gN_lRI",
  authDomain: "spacexboard.firebaseapp.com",
  projectId: "spacexboard",
  storageBucket: "spacexboard.appspot.com",
  messagingSenderId: "310812025808",
  appId: "1:310812025808:web:f9ad53c435580ce6f0cfd5",
  databaseURL: "https://spacexboard-default-rtdb.firebaseio.com/",
  measurementId: "G-740F453PWR"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Get a reference to the database service
var database = firebase.database();

function addView(){
  firebase.database().ref('views/counter').once('value', (snapshot) =>{
      firebase.database().ref('views').set({
        counter: snapshot.val()+1
      });
  });
}

function getRealtimeNumViews(view){
    firebase.database().ref('views/counter')
    .on('value', (snapshot)=>{
      view.innerHTML = snapshot.val();
    });
}

function getRealtimeRss(view){
    firebase.database().ref('rss')
    .on('value', (snapshot)=>{
      snapshot.forEach((child)=>{
      console.log("test: "+child.val().title)
      })
    });
}
// Add one view more
addView();

//Get number of views from database
getRealtimeNumViews(document.getElementById("visitors"));

//get rss from firebase database
//getRealtimeRss(document.getElementById("visitors"));
