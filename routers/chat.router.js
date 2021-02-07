// api/chat

const { Router } = require("express");
const validateToken = require("../middlewares/validate-token");
const getChat = require("../controllers/chat.controller");
const router = Router();

router.get("/:receiver", validateToken, getChat);

module.exports = router;
