export const LOGIN = 'auth/LOGIN';
export const LOGOUT = 'auth/CLEAR_USER';

export const login = (payload) => ({
  type: LOGIN,
  payload
});

export const logout = () => ({
  type: LOGOUT,
});
