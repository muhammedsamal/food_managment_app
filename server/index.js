import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import postRoute from "./routes/posts.js";
import userRoute from "./routes/users.js";
import orderRoute from "./routes/order.js";

const app = express();
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Helo to my cake shop");
});

app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/orders", orderRoute);

const CONNECTION_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(error.message));
