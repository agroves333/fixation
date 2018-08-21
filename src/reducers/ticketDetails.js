const ticketDetails = (state = {}, action) => {
  switch (action.type) {
    case 'GET_TICKET_REQUESTED':
      return {};
    case 'GET_TICKET_SUCCESS':
      return action.payload;
    case 'GET_TICKET_FAILED':
      return action.error;
    default:
      return state
  }
};

export default ticketDetails;