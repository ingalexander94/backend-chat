const User = require("../database/models/User");
const Message = require("../database/models/Message");

const setOnlineUser = async (isOnline, id) =>
  await User.findByIdAndUpdate(id, { isOnline }, { new: true });

const getUsers = async () => await User.find().sort("-isOnline");

const saveMessage = async (payload = {}) => {
  try {
    const message = new Message(payload);
    await message.save();
    return message;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  setOnlineUser,
  getUsers,
  saveMessage,
};
