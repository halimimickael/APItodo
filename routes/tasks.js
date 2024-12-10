const express = require("express");
const { taskModel } = require("../models/taskModel");
const {verifyToken} = require("../middlewares/verifyToken");
const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  try {
    let data = await taskModel.find({});
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  let task = new taskModel(req.body);
  await task.save();
  res.json(task);
});

router.delete("/:idDel",verifyToken, async (req, res) => {
  try {
    let data = await taskModel.deleteOne({ _id: req.params.idDel });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.put("/:idEdit", async (req, res) => {
  try {
    let data = await taskModel.updateOne({ _id: req.params.idEdit }, req.body);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

module.exports = router;






