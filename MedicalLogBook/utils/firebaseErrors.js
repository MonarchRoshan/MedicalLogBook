// firebaseErrors.js

export const firebaseErrors = {
  "auth/invalid-email": {
    message: "The email address is not valid.",
    code: "auth/invalid-email",
  },
  "auth/invalid-credential": {
    message: "The credentials are not valid.",
    code: "auth/invalid-credential",
  },
  "auth/user-disabled": {
    message: "The user account has been disabled by an administrator.",
    code: "auth/user-disabled",
  },
  "auth/user-not-found": {
    message: "There is no user corresponding to the given email.",
    code: "auth/user-not-found",
  },
  "auth/wrong-password": {
    message: "The password is invalid for the given email.",
    code: "auth/wrong-password",
  },
  // Add more error codes as needed
};
