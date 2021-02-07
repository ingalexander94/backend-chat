const { Schema, model } = require("mongoose");

const MessageSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    emitter: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

MessageSchema.method("toJSON", function () {
  const { __v, _id, ...message } = this.toObject();
  message.id = _id;
  return message;
});

module.exports = model("Message", MessageSchema);
