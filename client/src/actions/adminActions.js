// adminActions.js
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

export const logIn = ({ token, user }) => ({
  type: LOG_IN,
  payload: { token, user }
});

export const logOut = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('userData');
  return {
    type: LOG_OUT
  };
};
