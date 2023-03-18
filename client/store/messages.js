import axios from "axios";


const GET_MESSAGES = "GET_MESSAGES";

const _fetchMessages = (messages) => ({ type: GET_MESSAGES, messages });

export const fetchMessages = (id) => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`/api/messages/${id}`);
        dispatch(_fetchMessages(response.data))
      } catch (e) {
        console.log('Error fetching messages', e);
      }
    };
  };


export default function (state = [], action) {
    switch (action.type) {
      case GET_MESSAGES:
        return action.messages;
      default:
        return state;
    }
  }