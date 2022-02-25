const mongoose = require("mongoose");

async function connect() {
  try {
    const dbConnection = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB:", dbConnection.connection.name);
  } catch (error) {
    console.error("Connection error: " + error);
  }
}

module.exports = connect;
