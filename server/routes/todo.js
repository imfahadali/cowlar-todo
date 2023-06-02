const express = require("express");
const {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodo,
  toggleTodo,
  updateTodo,
} = require("../controllers/todo");
const authenticateUser = require("../middleware/auth");

const router = express.Router();

router.get("/", authenticateUser, getAllTodos);

router.post("/", authenticateUser, createTodo);

router.get("/:id", authenticateUser, getTodo);

router.post("/:id", authenticateUser, toggleTodo);

router.put("/:id", authenticateUser, updateTodo);

router.delete("/:id", authenticateUser, deleteTodo);

module.exports = router;
