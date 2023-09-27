var wsUri = "ws://localhost:8081/";
var connectionStateLabel;
var messageLabel;

var toSevermessageText;
var fromSevermessageText;



const CONNECTION_STATES = [ 
                            { state: false, text:"DISCONNECTED", textColor: "red" },
                            { state: true,  text:"CONNECTED",   textColor: "lightgreen"} 
                         ];

const DISCONNECTED = CONNECTION_STATES[0];
const CONNECTED    = CONNECTION_STATES[1];


  
function init() {
 
   setEventHandlers();
   initWebSocket();
}
  
function initWebSocket() {
   websocket = new WebSocket(wsUri);
      
   websocket.onopen = function(evt) {
      onOpen(evt)
   };
      
   websocket.onclose = function(evt) {
      onClose(evt)
   };
      
   websocket.onerror = function(evt) {
      onError(evt)
   };
}
  
function onOpen(evt) {
    displayConnectionLabelState( CONNECTED );
    doSend("Initiation of  WebSocket on client completed!"); 
}
  
function onClose(evt) {
    displayConnectionLabelState( DISCONNECTED );
}
  
function onError(evt) {
    displayMessage('ERROR: ' + evt.data, "red");
} 
  
function doSend(message) {
    //displayMessage(message); 
    console.log(`Sending to Server: ${message}`);
    websocket.send(message);
}
  

function displayConnectionLabelState( newState ) {

    connectionStateLabel.innerHTML = newState.text;

    connectionStateLabel.style = `color: ${newState.textColor};`;
    console.log(`Conection state is ${newState.text}`);
}

function displayMessage(message, textColor) {

    messageLabel.innerHTML = message;

    fromSevermessageText.value = message;

    if (textColor !== undefined)  
        messageLabel.style = `color: ${textColor}`;
    else
        messageLabel.style = `color: white}`; 
   
   console.log(`Send to Server: ${message}`);
}



function setEventHandlers() {

    connectionStateLabel = document.getElementById("connection-state");
    messageLabel = document.getElementById("message-display");

    toSevermessageText = document.getElementById("to-server-msg-textbox");
    fromSevermessageText  = document.getElementById("from-server-msg-textbox");

    const sendMsgButton = document.getElementById("send-msg-button");
    sendMsgButton.onclick = function(){  
        doSend(toSevermessageText.value); 
        toSevermessageText.value = "";
    };

    toSevermessageText.addEventListener("keydown", (e) => {  
        if (e.code === 'Enter') {
            doSend(toSevermessageText.value); 
            toSevermessageText.value = "";
        }
       }
    );

}
  

window.addEventListener("load", init, false);

