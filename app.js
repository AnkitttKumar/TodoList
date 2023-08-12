const express = require("express");
const bodyParser = require("body-parser");

var app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/todo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const trySchema = new mongoose.Schema({
  name: String,
});

const item = mongoose.model("task", trySchema);

const todo = new item({
  name: "Write an essay",
});
const todo2 = new item({
  name: "Workout",
});
const todo3 = new item({
  name: "Meditate",
});
const todo4 = new item({
  name: "Read Books",
});
// todo3.save();
// todo4.save();
// todo2.save();
app.get("/", async function (req, res) {
  try {
    const foundItems = await item.find({});
    res.render("list", { ejes: foundItems });
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred");
  }
});

app.post("/", async function (req, res) {
  const itemName = req.body.ele1;
  const todo6 = new item({
    name: itemName,
  });
  try {
    await todo6.save();
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).send("an error occurred");
  }
});
// app.post("/delete", function (req, res) {
//   const checked = req.body.checkbox1;
//   item.findByIdAndRemove(checked, function (err) {
//     if (!err) {
//       console.log("Deleted");
//       res.redirect("/");
//     }
//   });
// });

app.post("/delete", async function (req, res) {
  const checked = req.body.checkbox1;
  try {
    const result = await item.findByIdAndRemove(checked).exec();
    if (result) {
      console.log("deleted");
      res.redirect("/");
    } else {
      console.log("Item Not found");
      res.redirect("/");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error found");
  }
});

app.listen("5000", function () {
  console.log("Server is Running");
});
