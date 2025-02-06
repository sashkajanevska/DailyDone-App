const express = require("express");
const todoService = require("./todoService");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const userId = req.user._id;
    let { sortBy, order, search } = req.query;

    const sortObj = { [sortBy]: order };
    const filterObj = { userId };

    if (search) {
      filterObj.title = { $regex: search, $options: "i" };
    }

    const todos = await todoService.getAll({ sortObj, filterObj });
    res.status(200).json(todos);
  } catch (error) {
    console.error("Error fetching To-do's!", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

router.post("/", async (req, res) => {
  try {
    const todo = req.body;
    const userId = req.user._id;

    const newTodo = await todoService.createOne({ ...todo, userId });

    if (!newTodo) {
      return res.status(500).json({
        error:
          "Sorry, an error occurred while creating To-do. Please try again later.",
      });
    }
    res.status(201).json(newTodo);
  } catch (error) {
    console.error("Error creating To-do!", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user._id;
    const newTodo = req.body;

    const updatedTodo = await todoService.updateOne({ id, userId }, newTodo);

    if (!updatedTodo) {
      return res.status(404).json({
        error:
          "Sorry, the requested To-do could not be found. It may have been deleted or doesn't exist.",
      });
    }
    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error("Error updating To-do!", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user._id;

    const deletedTodo = await todoService.deleteOne({ id, userId });

    if (!deletedTodo) {
      return res.status(404).json({
        error:
          "Sorry, the requested To-do could not be found. It may have been deleted or doesn't exist.",
      });
    }
    res.status(200).json(deletedTodo);
  } catch (error) {
    console.error("Error deleting To-do!", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
