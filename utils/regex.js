// First Name Validation
export const isValidFirstName = (firstName) => {
  const firstNameRegex = /^[A-Za-z]{2,}$/;
  return firstNameRegex.test(firstName);
};

// Password Validation
export const isValidPassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{6,}$/;
  return passwordRegex.test(password);
};

// Email Validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
