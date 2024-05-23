// authMiddleware.js
import jwt from 'jsonwebtoken';

function decodeJWT(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, 'jwt_secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = decoded; // Set decoded user information in req.user
    next();
  });
}

export { decodeJWT };