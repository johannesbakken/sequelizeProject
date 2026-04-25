var express = require('express');
var router = express.Router();
const db = require("../Models");
const UserService = require("../services/UserService");
const userService = new UserService(db);

/* GET users listing. */
router.get('/:userId', async function(req, res, next) {
  const user = await userService.getOne(req.params.userId);
  res.render("userDetails", {user});
});

module.exports = router;
