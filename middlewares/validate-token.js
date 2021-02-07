const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const sendResponse = require("../helpers/responses");

const validateToken = (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token)
    return res.status(401).json(sendResponse(false, "No tiene un token"));
  try {
    const { id } = jwt.verify(token, process.env.SECRET_JWT_AUTH);
    req.id = id;
  } catch (error) {
    console.log(error);
    return res.status(401).json(sendResponse(false, "El token no es valido"));
  }
  next();
};

module.exports = validateToken;
