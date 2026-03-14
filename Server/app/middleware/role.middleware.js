const authorize = (...allowedRole) => {
  return (req, res, next) => {
    if (!allowedRole.includes(req.loginUser.usertype)) {
      return res.status(403).json({ message: "Access Denined" })
    }
    next()
  }
};

module.exports = authorize;