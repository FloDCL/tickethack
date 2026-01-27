const mongoose = require("mongoose");

const connectionString =
  "mongodb+srv://admin:UfSg5dnC6z4O804f@cluster0.xbxkwdv.mongodb.net/tickethack";

mongoose
  .connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log("Database connected"))
  .catch((error) => console.error(error));
