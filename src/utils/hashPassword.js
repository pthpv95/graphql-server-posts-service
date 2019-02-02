import bycrypt from "bcryptjs";
const hashPassword = password => {
  if (password.length < 7) {
    throw new Error("Password must be 7 characters or longer.");
  }

  return bycrypt.hash(password, 10);
};

export default hashPassword;
