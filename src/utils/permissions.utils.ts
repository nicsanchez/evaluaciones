export const throwErrorAndLogout = (
  data: any,
  errorMessage: any,
  objectThis: any
) => {
  objectThis.error(errorMessage, 'Error');
  objectThis.loginService.logout(data);
};
