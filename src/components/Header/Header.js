import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';

import get from 'lodash/get';
import { Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import { logout } from "../../actions/auth";

import s from './Header.module.css';

class Header extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      dropdownOpen: false
    };
    
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }
  
  getAvatar() {
    const photoURL = get(this.prop, 'user.photoURL', false);
    const name = get(this.props, 'user.name', false);
    const email = get(this.props, 'user.email', '');
    const username = email && email.split('@')[0];
    const initials = name && name.split(' ').reduce((acc, item) => {
      return acc + item.charAt(0);
    }, '');
    
    if (photoURL) {
      return <img className={s.avatar} src={photoURL} alt="" />;
    } else if (name) {
      return <div className={s.avatarPlaceholder}>{initials}</div>;
    } else {
      return <span className={s.email}>{username}</span>
    }
  }
  
  toggleDropdown() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    const { user } = this.props;
    const photoURL = get(user, 'photoURL', false);
    const name = get(user, 'name', false);
    const showUsernameDropdown = !(photoURL || name);
    
    return (
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">
            <span className={s.logo}>Fixation</span>
            <small className="ml-2">Ticket Management</small>
          </NavbarBrand>
          <Nav className="ml-auto" navbar>
            {!user && (
              <NavItem>
                <NavLink href="/login/">Login</NavLink>
              </NavItem>
            )}
            {!user && (
              <NavItem>
                <NavLink href="/register/">Register</NavLink>
              </NavItem>
            )}
            {user && (
              <Dropdown
                isOpen={this.state.dropdownOpen}
                toggle={this.toggleDropdown}
              >
                <DropdownToggle
                  className={classnames({
                    [s.profileDropdown]: !showUsernameDropdown,
                    [s.profileDropdownUsername]: showUsernameDropdown
                  })}
                  caret
                  color="white"
                >
                  {this.getAvatar()}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={this.props.logout}>Logout</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}
          </Nav>
        </Navbar>
    );
  }
}

Header.propTypes = {
  user: PropTypes.object,
};

Header.defaultProps = {
  user: null,
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(Header);
