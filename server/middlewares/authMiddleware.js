const jwt = require('jsonwebtoken')

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if(!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded;
    req.params.id = decoded.id;
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}

// verify club login token
exports.verifyClubToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.id = decoded.id;
    console.log(decoded);
    req.params.id = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}