const Todo = require("../models/todo");
const { getStartEndPeriod } = require("../utils/helperFunctions");

const todoController = {};

todoController.getAllTodos = async (req, res) => {
  // console.log(timeFrame);
  const { start, end } = getStartEndPeriod(req.query.timeframe);
  console.log("start, end");
  console.log(start, end);
  if (!start || !end) {
    return res.status(400).json({ message: "Invalid timeframe" });
  }

  try {
    // Find and sort todos with creating time
    const todos = await Todo.find({
      user: req.user._id.toString(),
      createdAt: { $gte: end, $lte: start }, 
    }).sort([["createdAt", -1]]);

    res
      .status(200)
      .json({ message: "Todos fetched successfully", data: todos });
  } catch (err) {
    res.status(404).json({ message: "Todo not found", error: err.message });
  }
};

todoController.createTodo = async (req, res) => {
  const { body, user } = req;
  console.log(user);
  try {
    const todo = await Todo.create({
      name: body.name,
      createdAt: Date.now(),
      user: user._id,
    });

    // await todo.save();
    res.status(200).json({ message: "Todo added successfully", data: todo });
  } catch (err) {
    res.status(400).json({ message: "Failed to add todo", error: err.message });
  }
};

todoController.getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    res.status(200).json({ message: "Todo fetched successfully", data: todo });
  } catch (err) {
    res.status(404).json({ message: "Todo not found", error: err.message });
  }
};

todoController.toggleTodo = async (req, res) => {
  const todoId = req.params.id;
  const userId = req.user._id;
  console.log(req.user);

  try {
    const todo = await Todo.findOne({ _id: todoId, user: userId });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todo.completed = !todo.completed;
    todo.completedAt = todo.completed ? Date.now() : null;

    await todo.save();
    res.status(200).json({ message: "Updated successfully", data: todo });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to update todo", error: err.message });
  }
};

todoController.updateTodo = async (req, res) => {
  console.log(req.body.name);
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id },
      { name: req.body.name },
      { new: true }
    );

    await todo.save();

    res.status(200).json({ message: "Updated successfully", data: todo });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to update todo", error: err.message });
  }
};

todoController.deleteTodo = async (req, res) => {
  const todoId = req.params.id;
  const userId = req.user._id;

  try {
    const deletedTodo = await Todo.findByIdAndDelete({
      _id: todoId,
      user: userId,
    });

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res
      .status(200)
      .json({ message: "Todo deleted successfully", data: deletedTodo });
  } catch (err) {
    console.log("[ERROR]");
    res.status(404).json({ message: "Todo not found", error: err.message });
  }
};

module.exports = todoController;
