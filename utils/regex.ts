// First Name Validation
export const isValidFirstName = (firstName: string) => {
  const firstNameRegex = /^[A-Za-z]{2,}$/;
  return firstNameRegex.test(firstName);
};

// Password Validation
export const isValidPassword = (password: string) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{6,}$/;
  return passwordRegex.test(password);
};

// Email Validation
export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
