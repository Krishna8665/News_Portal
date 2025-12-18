const adminMiddleware = (req, res, next) => {
  // console.log("REQ.USER:", req.user);
  // console.log("REQ.USER ROLE:", req.user?.role);
  // console.log("typeof next:", typeof next);

  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admin only." });
  }

  next();
};

module.exports = adminMiddleware;
