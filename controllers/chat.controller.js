const { request, response } = require("express");
const Message = require("../database/models/Message");
const sendResponse = require("../helpers/responses");

const getChat = async (req = request, res = response) => {
  const { id: emitter } = req;
  const { receiver } = req.params;
  try {
    const chat = await Message.find({
      $or: [
        { emitter, receiver },
        { emitter: receiver, receiver: emitter },
      ],
    })
      .sort("createdAt")
      .limit(30);
    return res.status(200).json({
      ...sendResponse(true, "Chat listo"),
      chat,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(sendResponse(false));
  }
};

module.exports = getChat;
