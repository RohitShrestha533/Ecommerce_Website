import jwt from "jsonwebtoken";

const authenticateJWT =
  (roles = []) =>
  (req, res, next) => {
    const token =
      req.headers["authorization"]?.split(" ")[1] || req.cookies.token;

    if (!token) {
      return res.status(401).send({ message: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).send({ message: "Token is not valid" });
      }

      req.user = decoded; // Add decoded token data to req.user

      // Check role if roles are provided
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).send({ message: "Access denied" });
      }

      next(); // Proceed to the next middleware or route handler
    });
  };

export { authenticateJWT };
