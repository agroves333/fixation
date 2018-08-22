const auth = (state = {errors: []}, action) => {
  switch (action.type) {
    case 'LOGIN_REQUESTED':
      return {...state, errors: [] };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.user,
        redirectToReferrer: action.redirectToReferrer,
      };
    case 'LOGIN_FAILED':
      return {...state, errors: [...state.errors, action.error.message] };
      
    case 'REGISTER_REQUESTED':
      return {...state, errors: [] };
    case 'REGISTER_SUCCESS':
      return {...state, user: action.user };
    case 'REGISTER_FAILED':
      return {...state, errors: [...state.errors, action.error.message] };
  
    case 'LOGOUT_REQUESTED':
      return {...state, errors: [] };
    case 'LOGOUT_SUCCESS':
      return {...state, user: null };
    case 'LOGOUT_FAILED':
      return {...state, errors: [...state.errors, action.error.message] };
  
    case 'UPDATE_USER':
      return {
        ...state,
        user: {
          ...state.user,
          ...action.user
        },
        redirectToReferrer: false,
      };

    default:
      return state
  }
};

export default auth;