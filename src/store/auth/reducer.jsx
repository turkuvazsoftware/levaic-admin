const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'login':
      return {
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case 'logout':
      return {
        isAuthenticated: false,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

export default authReducer;
