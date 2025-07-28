import * as storage from "../../utilities/storage"

export const login = ({ user }) => {
  return (dispatch) => {
    storage.setItem('user', JSON.stringify(user));

    dispatch({
      type: 'login',
      payload: { user },
    });
  };
};

export const logout = () => {
  return (dispatch) => {
    storage.removeItem('user');

    dispatch({
      type: 'logout',
    });
  };
};

export const updateUser = (updatedUser) => {
  return (dispatch, getState) => {
    storage.setItem('user', JSON.stringify(updatedUser));

    dispatch({
      type: 'updateUser',
      payload: { user: updatedUser },
    });
  };
};


export const initAuthFromLocalStorage = () => {
  return (dispatch) => {
    const userStr = storage.getItem('user');

    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        dispatch({
          type: 'login',
          payload: { user },
        });
      } catch (error) {
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
