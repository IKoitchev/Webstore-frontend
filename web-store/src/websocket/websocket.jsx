// import React, { useState, useEffect } from "react";
// import SockJS from "sockjs-client";
// import Stomp from "react-stompjs";

// // Set the backend location
// const ENDPOINT = "http://localhost:8080/ws";

// function Websocket() {
//   const [stompClient, setStompClient] = useState(null);
//   const [msgToSend, setSendMessage] = useState("Enter your message here!");

//   useEffect(() => {
//     // use SockJS as the websocket client
//     const socket = SockJS(ENDPOINT);
//     // Set stomp to use websockets
//     const stompClient = Stomp.over(socket);
//     // connect to the backend
//     stompClient.connect({}, () => {
//       // subscribe to the backend
//       stompClient.subscribe("/topic/greetings", (data) => {
//         console.log(data);
//         onMessageReceived(data);
//       });
//     });
//     // maintain the client for sending and receiving
//     setStompClient(stompClient);
//   }, []);

//   // send the data using Stomp
//   function sendMessage() {
//     stompClient.send("/app/hello", {}, JSON.stringify({ name: msgToSend }));
//   }

//   // display the received data
//   function onMessageReceived(data) {
//     const result = JSON.parse(data.body);
//     alert(result.content);
//   }

//   //TODO, add a solution for disconnection

//   return (
//     <div className="ws">
//       <br></br>
//       <input onChange={(event) => setSendMessage(event.target.value)}></input>
//       <button onClick={sendMessage}>Send Message</button>
//     </div>
//   );
// }

// export default Websocket;
