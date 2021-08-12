const express = require("express");
const router = new express.Router();
const Task = require("../models/task");
const auth = require("../middleware/auth");
const bodyParser = require("body-parser");

router.post("/tasks", auth, async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.redirect("/private");
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
router.get("/tasks/phrase", auth, async (req, res) => {
  const searchPhrase = req.query.searchPhrase;
  try {
    if (!searchPhrase) res.redirect("/private");
    const tasks = await Task.find({
      $or: [
        { taskName: { $regex: searchPhrase } },
        { description: { $regex: searchPhrase } },
      ],
    });
    res.send(tasks);
  } catch (error) {
    res.send(error);
  }
});
router.get("/tasks/phraseFound", auth, (req, res) => {
  res.render("taskPhrase");
});

router.get("/tasks/searchByDate", auth, async (req, res) => {
  const searchDate = req.query.searchDate;
  try {
    if (!searchDate) res.redirect("/private");
    const tasks = await Task.find({ taskDate: searchDate });
    res.send(tasks);
  } catch (error) {
    res.send(error);
  }
});
router.get("/tasks/searchByDateView", auth, (req, res) => {
  res.render("filterByDate");
});

router.get("/today", auth, (req, res) => {
  res.render("taskToday");
});
router.get("/tasks/selectedDate", auth, async (req, res) => {
  // belki header olarak gönderilebilir. date
  const date = req.query.date;

  try {
    const tasks = await Task.find({ taskDate: date });
    // console.log(req.body);
    if (!tasks || tasks.length == 0) {
      res.send("no task found at " + date);
    }
    res.send(tasks);
  } catch (error) {
    res.send(error);
  }
});
router.get("/tasks/date", auth, (req, res) => {
  res.render("taskDate");
});

router.post("/tasks/:id", auth, async (req, res) => {
  delete req.body.taskId;
  const updates = Object.keys(req.body);
  const allowedUpdates = ["taskName", "taskDate", "taskTime", "description"];
  const isValid = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  const id = req.params.id;
  if (!isValid) {
    return res.status(400).send("not valid update parameters");
  }

  try {
    const task = await Task.findById(id);
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.redirect("/private");
  } catch (error) {
    res.status(400).send();
  }
});
router.post("/tasksDelete/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).send("no task found");
    res.redirect("/private");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
