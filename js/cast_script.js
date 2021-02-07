var LOG_NAMESPACE = "urn:x-cast:elricdog.github.io.spacexboard.Log"

var castReceiverContext = cast.framework.CastReceiverContext.getInstance();
//castReceiverContext.setLoggerLevel(cast.framework.LoggerLevel.DEBUG);
castReceiverContext.addCustomMessageListener(LOG_NAMESPACE, function (customEvent) {
logElement.innerText += LOG_NAMESPACE + " - " + customEvent.data.message + "\n";
console.log(LOG_NAMESPACE + " - " + customEvent.data.message);
});
var logElement = document.querySelector("#logger");
logElement.innerText = "Logging Events\n\n";

// JSON is the default type, but you can be sure anyway
castReceiverOptions.customNamespaces = Object.assign({});
castReceiverOptions.customNamespaces[LOG_NAMESPACE] = cast.framework.system.MessageType.JSON;
castReceiverContext.start(castReceiverOptions);


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
