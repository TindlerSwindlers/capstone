import axios from "axios";

const GET_MESSAGES = "GET_MESSAGES";
const SEND_MESSAGE = "SEND_MESSAGE";

const _fetchMessages = (messages) => ({ type: GET_MESSAGES, messages });
const _sendMessage = (message) => ({ type: SEND_MESSAGE, message });

export const fetchMessages = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/messages/${id}`);
      dispatch(_fetchMessages(response.data));
    } catch (e) {
      console.log("Error fetching messages", e);
    }
  };
};
export const sendMessage = (message) => {
  console.log(message);
  return async (dispatch) => {
    try {
      const response = await axios.post(`/api/messages`, message);
      dispatch(_sendMessage(response.data));
    } catch (e) {
      console.log("Error sending message", e);
    }
  };
};

export default function (state = [], action) {
  switch (action.type) {
    case GET_MESSAGES:
      return action.messages;
    case SEND_MESSAGE:
      return [...state, action.message];
    default:
      return state;
  }
}
