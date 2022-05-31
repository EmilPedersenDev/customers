require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const Port = process.env.PORT || 3000;

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

require("./routes/user-route")(app);

app.get("/", (req, res) => {
  res.json({
    message: "Connecteddd!",
  });
});

app.listen(Port, () => {
  console.log(`Listening successful on ${Port}.`);
});
