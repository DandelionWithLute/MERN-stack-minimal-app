const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// forgot this env
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");

const z = require("zod");
const userSchema = require("./userSchema");
const stringSchema = z
  .string()
  .refine((val) => (val.length < 999) & (val.length > 0));

console.log(`${process.env.MONGODB_URL}`);
mongoose.connect(process.env.MONGODB_URL);
const connection = mongoose.connection;
connection
  .on("open", () => console.log("mongoose is connected"))
  .on("close", () => console.log("mongoose is disconnected"))
  .on("error", (error) => console.log(error));

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3456;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/user", async (req, res) => {
  const body = await req.body;
  const name = stringSchema.parse(body.name);
  const age = stringSchema.parse(body.age);
  const sex = stringSchema.parse(body.sex);
  console.log(name, age, sex);
  const user = await userSchema.create({
    name,
    age,
    sex,
  });
  console.log("userSchema create:", user);
  res.send(user);
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
