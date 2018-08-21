import { combineReducers } from 'redux';

import auth from './auth';
import tickets from './tickets';
import ticketDetails from './ticketDetails';

export default combineReducers({
  auth,
  tickets,
  ticketDetails,
});