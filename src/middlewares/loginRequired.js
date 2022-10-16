import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['Login Required'],
    });
  }

  const [bearer, token] = authorization.split(' ');

  if (!bearer) {
    return res.status(401).json({
      errors: ['Login Required'],
    });
  }

  try {
    const dadas = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dadas;
    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (error) {
    return res.status(401).json({
      errors: ['Token Expired'],
    });
  }
};
