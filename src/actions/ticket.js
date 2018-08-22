import { db } from '../firebase';
import pick from 'lodash/pick';
import get from 'lodash/get';
let unsubscribeGetTickets = () => {};

export const login = payload => ({
  type: 'LOGIN',
  payload
});

export const getTickets = data => dispatch => {
  unsubscribeGetTickets();
  const sort = get(data, 'sort', false);
  const order = get(data, 'order', false);

  dispatch({
    type: 'GET_TICKETS_REQUESTED',
  });
  
  // Default sort by data and priority
  // Otherwise, sort on selected column
  const ticketsRef = sort ?
    db.collection("tickets")
      .orderBy(sort, order ? 'asc' : 'desc') :
    db.collection("tickets")
      .orderBy('priority')
      .orderBy('createdAt');
  
  unsubscribeGetTickets = ticketsRef.onSnapshot(querySnapshot => {
    const payload = [];
    querySnapshot.forEach(doc => {
      payload.push({id: doc.id, ...pick(doc.data(), ['summary', 'assignee', 'reporter', 'priority'])});
    });
    dispatch({
      type: 'GET_TICKETS_SUCCESS',
      payload
    });
  });
};

export const getTicket = id => dispatch => {
  dispatch({
    type: 'GET_TICKET_REQUESTED',
  });
  
  db.collection('tickets').doc(id)
    .get()
    .then(doc => {
      dispatch({
        type: 'GET_TICKET_SUCCESS',
        payload: doc.data(),
      });
    })
    .catch(error => {
      dispatch({
        type: 'GET_TICKET_FAILED',
        error
      });
    });
};

export const createTicket = data => dispatch => {
  dispatch({
    type: 'SAVE_TICKET_REQUESTED',
  });
  
  db.collection('tickets').add({
    ...data,
    createdAt: new Date(),
  })
    .then(() => {
      dispatch({
        type: 'SAVE_TICKET_SUCCESS',
      });
    })
    .catch(error => {
      dispatch({
        type: 'SAVE_TICKET_FAILED',
        error
      });
    });
};

export const updateTicket = (id, data) => dispatch => {
  dispatch({
    type: 'UPDATE_TICKET_REQUESTED',
  });
  
  db.collection('tickets').doc(id).update({
    ...data,
    modifiedAt: new Date(),
  })
    .then(() => {
      dispatch({
        type: 'UPDATE_TICKET_SUCCESS',
      });
    })
    .catch(error => {
      dispatch({
        type: 'UPDATE_TICKET_FAILED',
        error
      });
    });
};

export const deleteTicket = id => dispatch => {
  dispatch({
    type: 'DELETE_TICKET_REQUESTED',
  });
  
  db.collection('tickets').doc(id).delete()
    .then(() => {
      dispatch({
        type: 'DELETE_TICKET_SUCCESS',
      });
    })
    .catch(error => {
      dispatch({
        type: 'DELETE_TICKET_FAILED',
        error
      });
    });
};