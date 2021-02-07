const jwt = require("jsonwebtoken");

const generateJWT = (id = "") => {
  return new Promise((resolve, reject) => {
    const payload = { id };
    jwt.sign(
      payload,
      process.env.SECRET_JWT_AUTH,
      { expiresIn: "24h" },
      (err, token) => {
        if (err) reject("No se pudo generar el token", err);
        else resolve(token);
      }
    );
  });
};

const checkJWT = (token = "") => {
  try {
    const { id } = jwt.verify(token, process.env.SECRET_JWT_AUTH);
    return [true, id];
  } catch (error) {
    console.log(error);
    return [false, null];
  }
};

module.exports = { generateJWT, checkJWT };
