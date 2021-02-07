var LOG_NAMESPACE = "urn:x-cast:elricdog.github.io.spacexboard.Log"
var castReceiverContext = cast.framework.CastReceiverContext.getInstance();
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
