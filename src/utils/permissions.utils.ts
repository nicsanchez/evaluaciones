export const throwErrorAndLogout = (
  data: any,
  errorMessage: any,
  objectThis: any
) => {
  objectThis.toastrService.error(errorMessage, 'Error');
  objectThis.loginService.logout(data);
};
