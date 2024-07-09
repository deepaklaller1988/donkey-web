// utils/errorHandler.js
export const handleError = (errorMessage:any) => {
  switch (errorMessage) {
    case 'ERR_AUTH_WRONG_USERNAME_OR_PASSWORD':
      return 'Wrong email or password';
    case 'ERR_AUTH_USER_NOT_FOUND':
      return 'User not found.';
    case 'ERR_AUTH_USER_LOCKED':
      return 'User account is locked.';
    default:
      return 'An error occurred. Please try again.';
  }
};
