const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectDb = require("./config/db");
connectDb();
const { userRoute } = require("./src/route/userRoute");
const { newsRoute } = require("./src/route/newsRoute");

const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/user", userRoute);
app.use("/api/news", newsRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
