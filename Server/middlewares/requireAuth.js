// (HOC)
import jwt from "jsonwebtoken";

const requireAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).json({ loginStatus: false, message: 'Unauthorized' });
  }

  jwt.verify(token, 'jwt_secret_key', (err, decoded) => {
    if (err) {
      return res.status(403).json({ loginStatus: false, message: 'Invalid token' });
    }

    // Attach the decoded user information to the request object
    req.user = decoded;
    next();
  });
};

export default requireAuth;