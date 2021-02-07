const { request, response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../database/models/User");
const sendResponse = require("../helpers/responses");
const { generateJWT } = require("../helpers/token");

const createUser = async (req = request, res = response) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user)
      return res.status(400).json(sendResponse(false, "Usuario ya existe"));
    user = new User(req.body);
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    await user.save();
    const token = await generateJWT(user.id);
    return res.status(200).json({
      ...sendResponse(true, "Bienvenido al chat"),
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(sendResponse(false));
  }
};

const login = async (req = request, res = response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json(sendResponse(false, "Usuario no existe"));

    if (!bcrypt.compareSync(password, user.password))
      return res.status(401).json(sendResponse(false, "Clave incorrecta"));

    const token = await generateJWT(user.id);
    return res.status(200).json({
      ...sendResponse(true, "Bienvenido al chat"),
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(sendResponse(false));
  }
};

const renewToken = async (req = request, res = response) => {
  const { id } = req;
  try {
    const token = await generateJWT(id);
    const user = await User.findById(id);
    return res.status(200).json({
      ...sendResponse(true, "Bienvenido de nuevo"),
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(sendResponse(false));
  }
};

module.exports = {
  createUser,
  login,
  renewToken,
};
