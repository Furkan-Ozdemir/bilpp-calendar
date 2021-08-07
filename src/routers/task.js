const express = require("express");
const router = new express.Router();
const Task = require("../models/task");
const auth = require("../middleware/auth");

router.get("/a", (req, res) => {
  res.render("taskToday");
});
router.post("/tasks", auth, async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/tasks", auth, async (req, res) => {
  try {
    const tasks = await Task.find({});
    if (!tasks) return res.status(404).send("no task found");
    res.send(tasks);
  } catch (error) {
    res.status(500).send();
  }
});
router.get("/task/today", auth, async (req, res) => {
  let year = new Date().getFullYear();
  let day = (new Date().getDate() < 10 ? "0" : "") + new Date().getDate();
  let month =
    (new Date().getMonth() < 10 ? "0" : "1") + (new Date().getMonth() + 1);
  let dateValue = year + "-" + month + "-" + day;
  try {
    const tasks = await Task.find({ taskDate: dateValue });
    if (!tasks) {
      return res.send("no task found");
    }
    res.send(tasks); // başka bi sayfa oluştur sırf taskler için
  } catch (error) {
    res.send(error);
  }
});
router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findById({ _id });
    if (!task) return res.status(404).send();
    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["completed", "description"];
  const isValid = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  const id = req.params.id;
  if (!isValid) {
    return res.status(400).send("not valid update parameters");
  }

  try {
    // const task = await Task.findOneAndUpdate({ _id: id }, req.body, {
    //   new: true,
    //   runValidators: true,
    //   useFindAndModify: false,
    // });
    const task = await Task.findById(id);
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.send(task);
  } catch (error) {
    res.status(400).send();
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).send("no task found");
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
