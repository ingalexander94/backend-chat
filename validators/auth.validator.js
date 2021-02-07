const { check } = require("express-validator");
const finishValidate = require("../middlewares/finish-validate");

const validateRegister = () => {
  return [
    check("name", "El nombre es obligatorio").isLength({ min: 2 }),
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "Debe tener mínimo 6 caracteres").isLength({ min: 6 }),
    finishValidate,
  ];
};

const validateLogin = () => {
  return [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "Debe tener mínimo 6 caracteres").isLength({ min: 6 }),
    finishValidate,
  ];
};

module.exports = {
  validateRegister,
  validateLogin,
};
