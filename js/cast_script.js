var LOG_NAMESPACE = "urn:x-cast:elricdog.github.io.spacexboard.Log"

var castReceiverContext = cast.framework.CastReceiverContext.getInstance();
//castReceiverContext.setLoggerLevel(cast.framework.LoggerLevel.DEBUG);
castReceiverContext.addCustomMessageListener(LOG_NAMESPACE, function (customEvent) {
  logElement.innerText += LOG_NAMESPACE + " - " + customEvent.data.position + "\n";
  logElement.innerText += LOG_NAMESPACE+ " DATA - " + customEvent.data + "\n";
  logElement.innerText += LOG_NAMESPACE+ " EVENT - " + customEvent + "\n";
  console.log(LOG_NAMESPACE + " - " + customEvent.data.message);
  changeVideo(customEvent.position, customEvent.videoId, customEvent.mute);
});
var logElement = document.querySelector("#logger");
logElement.innerText = "Logging Events\n\n";

// JSON is the default type, but you can be sure anyway
const options = new cast.framework.CastReceiverOptions();
options.customNamespaces = Object.assign({});
options.customNamespaces[LOG_NAMESPACE] = cast.framework.system.MessageType.JSON;
castReceiverContext.start(options);


window.addEventListener("load", function(){
     onYouTubeIframeAPIReady();
});

var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
   document.querySelectorAll('.ytplayer').forEach((item) => {
       new YT.Player(item, {
           events: {
               'onReady': (event) => {
                  event.target.playVideo();
                  event.target.mute();
               }
           }
       })
   })
}

function changeVideo(position, videoId, isMute){
  document.getElementById('ytplayer'+position).src = "https://www.youtube.com/embed/"+videoId+"?mute="+isMute+"&enablejsapi=1&controls=0&loop=1&showinfo=0&rel=0"
}
