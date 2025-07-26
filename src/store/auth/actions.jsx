import * as storage from "../../utilities/storage"

export const login = ({ user, token }) => {
  return (dispatch) => {
    storage.setItem('token', token);
    storage.setItem('user', JSON.stringify(user));

    dispatch({
      type: 'login',
      payload: { user, token },
    });
  };
};

export const logout = () => {
  return (dispatch) => {
    storage.removeItem('token');
    storage.removeItem('user');

    dispatch({
      type: 'logout',
    });
  };
};

export const initAuthFromLocalStorage = () => {
  return (dispatch) => {
    const token = storage.getItem('token');
    const userStr = storage.getItem('user');

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        dispatch({
          type: 'login',
          payload: { user, token },
        });
      } catch (error) {
        storage.removeItem('token');
        storage.removeItem('user');
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
