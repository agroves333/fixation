import React  from 'react';
import PropTypes from 'prop-types';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import s from './TicketDetailsModal.module.css'

const TicketDetailsModal = ({ isOpen, toggle, details }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Ticket Details</ModalHeader>
      <ModalBody>
        <div className={s.details}>
          <div className={s.row}>
            <div className={s.label}>Summary</div>
            <div>{details.summary}</div>
          </div>
          
          <div className={s.row}>
            <div className={s.label}>Description</div>
            <div>{details.description}</div>
          </div>
          <div className={s.row}>
            <div className={s.label}>Assignee</div>
            <div>{details.assignee}</div>
          </div>
          <div className={s.row}>
            <div className={s.label}>Reporter</div>
            <div>{details.reporter}</div>
          </div>
          <div className={s.row}>
            <div className={s.label}>Priority</div>
            <div className={s.priority}>{details.priority}</div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Close</Button>
      </ModalFooter>
    </Modal>
  );
};

TicketDetailsModal.propTypes = {
  details: PropTypes.object,
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
};

TicketDetailsModal.defaultProps = {
  details: {},
};

export default TicketDetailsModal;
