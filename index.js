const express = require("express");
const app = express();
const port = 5000; //상관없음

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://jisan:te30980808!@reactbasic.t4hc7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      // useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    }
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World! 안녕하세요"); //출력
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`); //포트에서 실행
});
