// api/auth

const { Router } = require("express");
const validateToken = require("../middlewares/validate-token");
const fieldValidation = require("../validators/auth.validator");
const actions = require("../controllers/auth.controller");

const router = Router();

router.post(
  "/register",
  fieldValidation.validateRegister(),
  actions.createUser
);
router.post("/login", fieldValidation.validateLogin(), actions.login);
router.get("/renew", validateToken, actions.renewToken);

module.exports = router;
