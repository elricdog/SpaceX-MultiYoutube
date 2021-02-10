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

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

function getCurrentUTCTime(){
  let d = new Date();
  let currentTimeZoneOffsetInHours = d.getTimezoneOffset() / 60;
  let utc = new Date();
  utc.setHours( utc.getHours() + currentTimeZoneOffsetInHours );  
  return utc;
}

function dateToDB(a) {
    return a.getDay() + "|" + a.getMonth() + "|" + a.getFullYear() + "|" + a.getHours() + "|" + a.getMinutes() + "|" + a.getSeconds();
}
function dbToDate(a) {
	var items = a.split("|");
	const y = items[2];
	const m = items[1];
	const d = items[0];
	const hh = items[3];
	const mm = items[4];
	const ss = items[5];
    return new Date(Date.UTC(y, m, d, hh, mm, ss));
}

// Add visitor in the current minute
function addVisitor(){
  firebase.database().ref('visitors/'+getGUID()).set({
    value: dateToDB(getCurrentUTCTime())
  });

  //Clean old visitors
  firebase.database().ref('visitors/').once('value', (visitors) =>{
	  var lowLimit = new Date(Date.now()-(1800*1000));	  
	  //console.log("Low Limit");
	  //console.log(lowLimit);
      visitors.forEach((child)=>{
		  var dbValue = child.val().value;
			if (typeof dbValue === 'string' || dbValue instanceof String) {
				var dbDate = dbToDate(dbValue);				
				//console.log("Date parsed");
				//console.log(dbDate);
				if (isValidDate(dbDate)) {
					if(dbDate < lowLimit){
						firebase.database().ref('visitors').child(child.key).remove();
					}	
				}
			}
      });
  });
}

function updateVisitor(){
  firebase.database().ref('visitors/'+getGUID()).set({
    value: dateToDB(getCurrentUTCTime())
  });
}

function getRealtimeNumViews(view){
    firebase.database().ref('views/counter')
    .on('value', (snapshot)=>{
      view.innerHTML = snapshot.val();
	  updateRSSTextScrollWidth();
    });
}

function getRealTimeVisitors(view){
  firebase.database().ref('visitors/').on('value', (visitorTime) =>{
      view.innerHTML = visitorTime.numChildren();
	  updateRSSTextScrollWidth();
  });
}

function getRealtimeRss(view){
	console.log(">>> RSS Fetch");
    firebase.database().ref('rss')
    .on('value', (snapshot)=>{
      console.log("RSS Updated");
	  var result = "";
      snapshot.forEach((child)=>{
		  var newItem = child.val();
		  if (newItem!=null) {
			  var newText = newItem.title;
			  if (newText!=null) {
				  newText = newText.trim();
				  if (newText!="") {
					result += '\xa0' + ' • ' + '\xa0' + newText;
				  }
			  }
		  }		  
      });
	  console.log("RSS Text: " + result);
	  view.innerHTML = result.trim() + '\xa0' + ' • ' + '\xa0';
    });
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

function restartLaunchStateAnimation() {
	console.log("Restart Launch State Animation");
	var groupLaunchState = document.getElementById("groupLaunchState");
	groupLaunchState.classList.remove("blinking");
	void groupLaunchState.offsetWidth;
	groupLaunchState.classList.add("blinking");
}

function getLaunchState(view){
	console.log(">>> LaunchState Fetch");
    firebase.database().ref('state/text')
    .on('value', (snapshot)=>{
		clearIntervalUpdateLaunchState();
		lastUpdateLaunchState = snapshot.val();
		view.innerHTML = lastUpdateLaunchState;
		restartLaunchStateAnimation();
		updateRSSTextScrollWidth();
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
				updateRSSTextScrollWidth();
				console.log("Updated Launch State to: " + view.innerHTML);
			}, 60000);			  
			view.innerHTML = "T - "+minutesUpdateLaunchState;
			restartLaunchStateAnimation();
			updateRSSTextScrollWidth();
		} else {
			if (minutesUpdateLaunchState==0) {
				view.innerHTML = lastUpdateLaunchState;
				updateRSSTextScrollWidth();		
			}
		}		
		console.log("Updated Launch State due DB change to: " + view.innerHTML);
    });
}

function getFeedsFromDB() {	
	console.log(">>> Feeds Fetch");
	firebase.database().ref('feeds')
	.on('value', (snapshot)=>{
		snapshot.forEach((child)=>{
			var title = child.key;
			var value = child.val();
			console.log("Feed [" + title + "] must be updated to: " + value);
			var newURL = composeYouTubeLiveStreamURL(value, 0);
			var newURLChat = composeYouTubeChatURL(value, 0);
			console.log("- Newest URL: " + newURL);

			// Update options
			const select1 = document.getElementById("selectCH1");
			const select2 = document.getElementById("selectCH2");
			const select3 = document.getElementById("selectCH3");
			const select4 = document.getElementById("selectCH4");						
			updateOptionsWithNewFeed(select1, title, newURL);
			updateOptionsWithNewFeed(select2, title, newURL);
			updateOptionsWithNewFeed(select3, title, newURL);
			updateOptionsWithNewFeed(select4, title, newURL);			
			const select5 = document.getElementById("selectCH5");						
			updateOptionsWithNewFeed(select5, title, newURLChat);
		});			
	});
}

function updateOptionsWithNewFeed(optionSelect, title, newURL) {
	for (var id in optionSelect.options) {
		var el = optionSelect.options[id];
		if (el.title==title) {				
			var changed = el.value != newURL;		
			if (changed) {
				console.log("- Replaced ["+title+"] with New URL on option position " + id + " on select " + optionSelect.id);				
				el.value = newURL;				
				var index = optionSelect.selectedIndex;
				var sel = optionSelect.options[index];
				console.log("- Currently selected on "+optionSelect.id+": " + sel.title);
				if (sel.title==title) {
					console.log("- !!! RELOADING !!!");
					var event = new Event('change');
					optionSelect.selectedIndex = sel.index;
					optionSelect.dispatchEvent(event);
					console.log("- Reload selected done");
					
					// Update last set and blinking
					const lastUpdate = document.getElementById("lastUpdate");
					var lastModifiedDate = new Date();
					lastUpdate.innerHTML = lastModifiedDate.toLocaleString();
					const lastUpdateLabel = document.getElementById('groupLastUpdate');
					lastUpdateLabel.classList.remove("blinking");
					void lastUpdateLabel.offsetWidth;
					lastUpdateLabel.classList.add("blinking");
				}
			}
			return;
		}
	}			
}

function SpaceXBoard_getAllSources(onlyVideoFeeds) {
	var result = "[";
	const optionSelect = document.getElementById("selectCH1");
	for (var id in optionSelect.options) {
		var el = optionSelect.options[id];
		var title = el.title;
		var value = el.value;
		if ((title!=null) && (value!=null)) {
			var id = "";
			if (value.startsWith("https://www.youtube.com/embed/")) {
				id = getVideoIdFromSource(value);
			} else if (onlyVideoFeeds) continue;
			result += "{ title:'"+title+"', value:'"+value+"', id:'"+id+"'},";
		}
	}			
	result += "]";
	return result;
}
