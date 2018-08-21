import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import Form from '../Form/Form';
import Grid from '../Grid/Grid';
import Header from '../Header/Header';
import TicketDetailsModal from '../TicketDetailsModal/TicketDetailsModal';

import { createTicket, getTickets, getTicket, updateTicket, deleteTicket, reorderColumns } from "../../actions/ticket";
import s from './Dashboard.module.css';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formModalOpen: false,
      deleteConfirmationModalOpen: false,
      ticketDetailsModalOpen: false,
      currentTicketId: null,
    };

    this.toggleFormModal = this.toggleFormModal.bind(this);
    this.toggleDeleteConfirmationModal = this.toggleDeleteConfirmationModal.bind(this);
    this.toggleTicketDetailsModal = this.toggleTicketDetailsModal.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.sortColumn = this.sortColumn.bind(this);
  }

  componentDidMount() {
    this.props.getTickets();
  }

  toggleFormModal(id) {
    this.setState({
      currentTicketId: id,
      formModalOpen: !this.state.formModalOpen,
    });
  }

  toggleDeleteConfirmationModal(id) {
    this.setState({
      currentTicketId: id,
      deleteConfirmationModalOpen: !this.state.deleteConfirmationModalOpen,
    });
  }

  toggleTicketDetailsModal(id) {
    id && this.props.getTicket(id);
    this.setState({
      ticketDetailsModalOpen: !this.state.ticketDetailsModalOpen,
    });
  }
  
  submitForm(values) {
    this.state.currentTicketId ?
      this.props.updateTicket(this.state.currentTicketId, values) :
      this.props.createTicket(values);
  }
  
  sortColumn(column, order) {
    this.props.getTickets({
      sort: column,
      order,
    });
  }

  render() {
    return (
      <div className={s.dashboard}>
        <div className="pt-2">
          <Button
            color="primary"
            className="mb-2"
            onClick={() => this.toggleFormModal()}>
            + New Ticket
          </Button>
          <Grid
            headers={{
              summary: 'Summary',
              assignee: 'Assignee',
              reporter: 'Reporter',
              priority: 'Priority',
            }}
            data={this.props.tickets}
            onDelete={this.toggleDeleteConfirmationModal}
            onUpdate={this.toggleFormModal}
            onRowClick={this.toggleTicketDetailsModal}
            onSort={this.sortColumn}
          />
          
          {/*Form Modal*/}
          <Modal isOpen={this.state.formModalOpen} toggle={this.toggleFormModal}>
            <ModalHeader toggle={this.toggleFormModal}>{`${this.state.currentTicketId ? 'Update' : 'Create'} Ticket`}</ModalHeader>
            <ModalBody>
              <Form
                closeModal={this.toggleFormModal}
                onSubmit={this.submitForm}
              />
            </ModalBody>
          </Modal>
  
          {/*Delete Confirmation Modal*/}
          <Modal isOpen={this.state.deleteConfirmationModalOpen} toggle={this.toggleDeleteConfirmationModal}>
            <ModalHeader toggle={this.toggleDeleteConfirmationModal}>Confirm Delete</ModalHeader>
            <ModalBody>
              Are you sure you want to delete this ticket?
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                onClick={() => {
                  this.props.deleteTicket(this.state.currentTicketId);
                  this.toggleDeleteConfirmationModal();
                }}>
                Delete
              </Button>{' '}
              <Button color="secondary" onClick={this.toggleDeleteConfirmationModal}>Cancel</Button>
            </ModalFooter>
          </Modal>
  
          <TicketDetailsModal
            isOpen={this.state.ticketDetailsModalOpen}
            toggle={() => this.toggleTicketDetailsModal()}
            details={this.props.ticketDetails}
          />
          
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  tickets: PropTypes.array,
  getTickets: PropTypes.func,
};

const mapStateToProps = state => ({
  tickets: state.tickets,
  ticketDetails: state.ticketDetails,
});

export default connect(mapStateToProps, {
  createTicket,
  getTickets,
  getTicket,
  updateTicket,
  deleteTicket,
  reorderColumns,
})(Dashboard);
