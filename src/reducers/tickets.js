const tickets = (state = [], action) => {
  switch (action.type) {
    case 'GET_TICKETS_REQUESTED':
      return [];
    case 'GET_TICKETS_SUCCESS':
      return action.payload;
    case 'GET_TICKETS_FAILED':
      return action.error;
    default:
      return state
  }
};

export default tickets;