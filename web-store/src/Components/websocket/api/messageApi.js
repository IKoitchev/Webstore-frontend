import axios from "axios";
import authHeader from "../../../services/auth-header";
import { BASE_URL } from "./baseApi";
import { getOrCreateStompClient } from "./stompClient";

export function loadMessages() {
  return axios.get(`${BASE_URL}/message`, { headers: authHeader() });
}

export function subscribeOnNewMessages(onNewMessage) {
  let stompClient = getOrCreateStompClient();
  stompClient.connect({}, () => {
    stompClient.subscribe("/topic/message", onNewMessage);
  });
}

export function postMessage({ userName, message }) {
  let stompClient = getOrCreateStompClient();
  const transaction = stompClient.begin();
  stompClient.send(
    "/ws/message",
    { headers: authHeader() },
    JSON.stringify({
      content: message,
      userName: userName,
    })
  );
  transaction.commit();
}
