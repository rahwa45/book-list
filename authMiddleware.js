import jwt from "jsonwebtoken";

const SECRET_KEY =
  "iprhdfkn.ndknhfdhfdklfkjldskjlfkjldfkjldskjlfjdsklfjkldskjlfkjldsfkjldskjlfkjldsfkjldskjlfkjldsfkjldskjlfdskjlfkjldskjlfdskjlfkjldfknjds";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res
      .status(401)
      .json({ message: "Invalid or expired token", error: err.message });
  }
};
