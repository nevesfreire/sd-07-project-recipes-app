export const EMAIL = 'EMAIL';

export const sendEmail = (email) => ({
  type: EMAIL,
  email,
});
