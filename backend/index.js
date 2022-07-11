require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./server");

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`Template is listening on port ${process.env.PORT}.`);
    });
  })
  .catch((error) => console.log(error));
