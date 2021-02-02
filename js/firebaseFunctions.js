/**
 * @function _guid
 * @description Creates GUID for user based on several different browser variables
 * It will never be RFC4122 compliant but it is robust
 * @returns {Number}
 * @private
 */
function getGUID() {

    var nav = window.navigator;
    var screen = window.screen;
    var guid = nav.mimeTypes.length;
    guid += nav.userAgent.replace(/\D+/g, '');
    guid += nav.plugins.length;
    guid += screen.height || '';
    guid += screen.width || '';
    guid += screen.pixelDepth || '';

    return guid;
};

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
// Get a reference to the analytics service
var analytics = firebase.analytics();

// Get a reference to the database service
var database = firebase.database();

let counterCleanOldVisitors = 0;

function addView(){
  firebase.database().ref('views/counter').once('value', (snapshot) =>{
      firebase.database().ref('views').set({
        counter: snapshot.val()+1
      });
  });

  var intervalAddVisitor = window.setInterval(function(){
  	counterCleanOldVisitors++;
  	counterCleanOldVisitors%=5;
  	if (counterCleanOldVisitors==0) {
  		console.log("CleanOldVisitors procedure")
  		addVisitor();
  	} else {
  		console.log("updateVisitor procedure")
  		updateVisitor();
  	}
  }, 300000);
  console.log("addVisitor procedure")
  addVisitor();
}

// Add visitor in the current minute
function addVisitor(){
  firebase.database().ref('visitors/'+getGUID()).set({
    value: getCurrentUTCTime()
  });

  //Clean old visitors
  firebase.database().ref('visitors/').once('value', (visitors) =>{
      visitors.forEach((child)=>{
        if(child.val().value < getCurrentUTCTime()-1800000){
          firebase.database().ref('visitors').child(child.key).remove();
        }
      });
  });
}

function updateVisitor(){
  firebase.database().ref('visitors/'+getGUID()).set({
    value: getCurrentUTCTime()
  });
}

function getRealtimeNumViews(view){
    firebase.database().ref('views/counter')
    .on('value', (snapshot)=>{
      view.innerHTML = snapshot.val();
    });
}

function getRealTimeVisitors(view){
  firebase.database().ref('visitors/').on('value', (visitorTime) =>{
      view.innerHTML = visitorTime.numChildren();
  });
}

function getRealtimeRss(view){
	console.log("RSS Fetch");
    firebase.database().ref('rss')
    .on('value', (snapshot)=>{
      console.log("RSS Updated");
	  var result = "";
      snapshot.forEach((child)=>{
		  var newItem = child.val();
		  if (newItem!=null) {
			  var newText = newItem.title;
			  if (newText!=null) {
				result += '\xa0' + ' • ' + '\xa0' + newText.trim();
			  }
		  }		  
      });
	  console.log("RSS Text: " + result);
	  view.innerHTML = result.trim() + '\xa0' + ' • ' + '\xa0';
    });
}

function getCurrentUTCTime(){
  let d = new Date();
  let currentTimeZoneOffsetInHours = d.getTimezoneOffset() / 60;
  let utc = new Date();
  utc.setHours( utc.getHours() + currentTimeZoneOffsetInHours );
  return utc.valueOf()
}

let lastUpdateLaunchState = "...";
let minutesUpdateLaunchState = 0;
let intervalUpdateLaunchState = null;
function clearIntervalUpdateLaunchState() {
	if (intervalUpdateLaunchState!==null) {
		window.clearInterval(intervalUpdateLaunchState);
		intervalUpdateLaunchState = null;
	}
}

function getLaunchState(view){
    firebase.database().ref('state/text')
    .on('value', (snapshot)=>{
		clearIntervalUpdateLaunchState();
		lastUpdateLaunchState = snapshot.val();
		view.innerHTML = lastUpdateLaunchState;
    });
    firebase.database().ref('state/minutes')
    .on('value', (snapshot)=>{
		clearIntervalUpdateLaunchState();
		minutesUpdateLaunchState = snapshot.val();
		if ((minutesUpdateLaunchState!=null) && (minutesUpdateLaunchState!="") && (minutesUpdateLaunchState!=0) && (minutesUpdateLaunchState!="0")) {
			intervalUpdateLaunchState = window.setInterval(function(){
				if (minutesUpdateLaunchState<=0)
				{
					clearIntervalUpdateLaunchState();					
					view.innerHTML = "GO FOR LAUNCH";
				} else {
					minutesUpdateLaunchState = minutesUpdateLaunchState-1;
					view.innerHTML = "T - "+minutesUpdateLaunchState;
				}
				console.log("Updated Launch State to: " + view.innerHTML);
			}, 60000);			  
			view.innerHTML = "T - "+minutesUpdateLaunchState;
		} else {
			if (minutesUpdateLaunchState==0) {
				view.innerHTML = lastUpdateLaunchState;
			}
		}
		console.log("Updated Launch State dur DB change to: " + view.innerHTML);
    });
}

// Add one view more
addView();

// Get number of views from database
getRealtimeNumViews(document.getElementById("visitors"));

// Get visitors in the last 20min
getRealTimeVisitors(document.getElementById("visitorsNow"));

// Get RSS from firebase database
getRealtimeRss(document.getElementById("rssTextScrollContent"));

// Get state of launch from database
getLaunchState(document.getElementById("launchState"));
