<script src="https://apis.google.com/js/api.js"></script>
function start() {
  // 2. Initialize the JavaScript client library.
  gapi.client.init({
    'apiKey': 'AIzaSyB1V1k4-VDbsR4Wi87EsSZOs83j3pjc-gg',
    // clientId and scope are optional if auth is not required.
    'clientId': '310812025808-vim8if9rm12k4js0rki4p8bfneval8hc.apps.googleusercontent.com',
    'scope': 'profile',
  }).then(function() {
    // 3. Initialize and make the API request.
    return gapi.client.request({
      'path': 'https://people.googleapis.com/v1/people/me?requestMask.includeField=person.names',
    })
  }).then(function(response) {
    console.log(response.result);
  }, function(reason) {
    console.log('Error: ' + reason.result.error.message);
  });
};
// 1. Load the JavaScript client library.
gapi.load('client', start);
</script>
