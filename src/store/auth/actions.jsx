export const login = ({ user, token }) => {
  return (dispatch) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    dispatch({
      type: 'login',
      payload: { user, token },
    });
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    dispatch({
      type: 'logout',
    });
  };
};

export const initAuthFromLocalStorage = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        dispatch({
          type: 'login',
          payload: { user, token },
        });
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch({
          type: 'logout',
        });
      }
    } else {
      dispatch({
        type: 'logout',
      });
    }
  };
};
