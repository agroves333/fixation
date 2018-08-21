import firebase from '../firebase';

export const login = payload => dispatch => {
  dispatch({
    type: 'LOGIN_REQUESTED',
  });
  
  firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
    .then(response => {
      dispatch({
        type: 'LOGIN_SUCCESS',
        user: response.user,
        redirectToReferrer: true,
      });
    }, error => {
      dispatch({
        type: 'LOGIN_FAILED',
        error,
      });
    });
};

export const register = payload => dispatch => {
  dispatch({
    type: 'REGISTER_REQUESTED',
  });
  firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
    .then(response => {
      dispatch({
        type: 'REGISTER_SUCCESS',
        user: response.user
      });
      // Save user
      // db.collection('users').doc(user.id)
    })
    .catch(error => {
      dispatch({
        type: 'REGISTER_FAILED',
        error,
      });
    });
};

export const logout = () => dispatch => {
  dispatch({
    type: 'LOGOUT_REQUESTED',
  });
  
  firebase.auth().signOut()
    .then(() => {
      dispatch({
        type: 'LOGOUT_SUCCESS',
      });
    })
    .catch(error => {
      dispatch({
        type: 'LOGOUT_FAILED',
        error,
      });
    });
};

export const updateUser = user => dispatch => {
  dispatch({
    type: 'UPDATE_USER',
    user
  });
};
