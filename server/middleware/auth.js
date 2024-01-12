const { db, auth } = require('../database');

const verifyToken = (req, res, next) => {
    const token =
    req.body.token || req.query.token || req.headers['x-access-token'];

    console.log(token);
    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }

    auth.verifyIdToken(token)
    .then((decodedToken) => {
      req.user = decodedToken;
      next();
    })
    .catch((error) => {
      console.error('Error verifying Firebase ID token:', error);
      return res.status(403).send('Unauthorized: Invalid token');
    });
};
  
module.exports = verifyToken;