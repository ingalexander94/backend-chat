const sendResponse = (ok = true, text = "") => ({
  ok,
  msg: text ? text : "Hable con el administrador",
});

module.exports = sendResponse;
