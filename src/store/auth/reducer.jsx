const initialState = {
  isAuthenticated: false,
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'login':
      return {
        isAuthenticated: true,
        user: action.payload.user,
      };
    case 'logout':
      return {
        isAuthenticated: false,
        user: null,
      };
    case 'updateUser':
      return {
        ...state,
        user: action.payload.user
      };
    default:
      return state;
  }
};

export default authReducer;
