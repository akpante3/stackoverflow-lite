
import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
  const token = req.header('accessToken');
  
  if (token) {
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.id;
      req.username = decoded.name;
      next();
    } catch (error) {
      res.status(401).send('Invalid Token');
    }
  } else {
    res.status(401).send('No access token found');
  }
};

export default authenticate;
