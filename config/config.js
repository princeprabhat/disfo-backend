const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../.env") });

module.exports = {
  X_API_KEY: process.env.X_API_KEY,
    port: process.env.PORT,
    mongoose: {
      url: process.env.MONGODB_URL,
      options: {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
    },
  };