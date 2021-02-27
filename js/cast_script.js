var LOG_NAMESPACE = "urn:x-cast:elricdog.github.io.spacexboard.Log"

var castReceiverContext = cast.framework.CastReceiverContext.getInstance();
//castReceiverContext.setLoggerLevel(cast.framework.LoggerLevel.DEBUG);
castReceiverContext.addCustomMessageListener(LOG_NAMESPACE, function (customEvent) {
  logElement.innerText += LOG_NAMESPACE + " - " + customEvent.data + "\n";
  if(customEvent.data.videoId == ""){
    changeVolume(customEvent.data.position)
  }else{
    updateAndPlayVideo(customEvent.data.position, customEvent.data.videoId);
  }

});
//var logElement = document.querySelector("#logger");
//logElement.innerText = "Logging Events\n\n";

// JSON is the default type, but you can be sure anyway
const options = new cast.framework.CastReceiverOptions();
options.customNamespaces = Object.assign({});
options.customNamespaces[LOG_NAMESPACE] = cast.framework.system.MessageType.JSON;
castReceiverContext.start(options);
