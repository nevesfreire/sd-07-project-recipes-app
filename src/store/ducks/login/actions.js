import userAction from './types';

export const sendEmail = (email) => ({ type: userAction.USER_EMAIL, email });

export default sendEmail;
