
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
      res.status(401).send({
        status: 'failure',
        message: 'token is not valid, please insert a valid token',
      });
    }
  } else {
    res.status(401).send({
      status: 'failure',
      message: 'access-token was not found',
    });
  }
};

export default authenticate;
