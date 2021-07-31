import toastr from 'toastr';

const timeOut = 2000;

export const displayWarning = (message: string) => toastr.warning(message, 'Warning', { timeOut });
export const displaySuccess = (message: string) => toastr.success(message, 'Success', { timeOut });
export const displayError = (message: string) => toastr.error(message, 'Error', { timeOut });
export const displayInfo = (message: string) => toastr.info(message, 'Information', { timeOut });
