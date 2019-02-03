import jwt from "jsonwebtoken";

const getUserId = (request, requiredAuth = true) => {
  const header = request.request
    ? request.request.headers.authorization
    : request.connection.context.Authorization;

  if (header) {
    const token = header.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.PRISMA_SECRET);

    return decoded.userId;
  }

  if (requiredAuth) {
    throw new Error("Need Authentication!");
  }

  return null;
};

const generateToken = payload => {
  const token = jwt.sign(payload, process.env.PRISMA_SECRET, {
    expiresIn: "1w"
  });

  return token;
};

export { getUserId, generateToken };
