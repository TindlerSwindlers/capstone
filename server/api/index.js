const router = require("express").Router();


router.use("/users", require("./users"));
router.use("/posts", require("./posts"));
router.use("/comments", require("./comments"));
router.use("/halfways", require("./halfway"));
router.use("/matches", require("./matches"));
router.use("/messages", require("./messages"));


router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;