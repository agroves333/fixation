import React from 'react';
import ReactDOM from 'react-dom';
import TicketDetailsModal from './TicketDetailsModal';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TicketDetailsModal />, div);
  ReactDOM.unmountComponentAtNode(div);
});
