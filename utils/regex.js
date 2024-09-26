// First Name Validation
const isValidFirstName = (firstName) => {
  const firstNameRegex = /^[A-Za-z]{2,}$/;
  return firstNameRegex.test(firstName);
};

// Password Validation
const isValidPassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{6,}$/;
  return passwordRegex.test(password);
};

// Email Validation
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
