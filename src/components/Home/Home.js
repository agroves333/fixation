import React, { Component } from 'react';
import { connect } from 'react-redux';

import s from './Home.module.css';

class Home extends Component {
  
  render() {
    return (
      <div className='text-center mb-3'>
        <div className={s.logo}>Fixation</div>
        <div>Ticket Management Software Made Easy</div>
      </div>
    );
  }
}

export default connect()(Home);
