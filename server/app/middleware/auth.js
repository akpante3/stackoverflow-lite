
import jwt from 'jsonwebtoken';
import config from '../../config';

const authenticate = (req, res, next) => {
    debugger;
    const token = req.header('access-token');
    if(token) {
        let decoded;
        try {
            decoded = jwt.verify(token, config.secret);
            req.userId = decoded.id;
            next();
        } catch (error) {
            res.status(401).send('Invalid Token');
        }
    } else {
        res.status(401).send('No access token found');
    }
}

export default authenticate;