const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("DB Online");
  } catch (error) {
    console.error("No se pudo realizar la conexión a la Mongo");
    console.error(error);
  }
};

module.exports = dbConnection;
