const todoController = require("./todo");
const Todo = require("../models/Todo");

describe("Todo CRUD", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test case for getAllTodos
  it("should return all todos within the specified timeframe", async () => {
    const mockUser = { _id: "user123" };
    const mockTodos = [
      { name: "Todo 1", createdAt: new Date("2023-06-12T15:35:07.540Z") },
      { name: "Todo 2", createdAt: new Date("2023-06-10T09:20:00.000Z") },
    ];
    const mockReq = {
      user: mockUser,
      query: { timeframe: "today" },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.spyOn(Todo, "find").mockImplementation(() => ({
      sort: () => mockTodos,
    }));

    await todoController.getAllTodos(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Todos fetched successfully",
      data: mockTodos,
    });
    expect(Todo.find).toHaveBeenCalledWith({
      user: mockUser._id.toString(),
      createdAt: expect.any(Object),
    });
  });

  // Test case for getTodo
  it("should return a specific todo", async () => {
    const mockReq = { params: { id: "todo123" } };
    const mockTodo = { name: "Todo 1" };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.spyOn(Todo, "findById").mockResolvedValue(mockTodo);

    await todoController.getTodo(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Todo fetched successfully",
      data: mockTodo,
    });
    expect(Todo.findById).toHaveBeenCalledWith(mockReq.params.id);
  });
  // Test case for createTodo
  it("should create a new todo", async () => {
    const mockReq = {
      body: { name: "New Todo" },
      user: { _id: "user123" },
    };
    const mockTodo = { name: "New Todo" };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.spyOn(Todo, "create").mockResolvedValue(mockTodo);
    jest.spyOn(Date, "now").mockReturnValueOnce(1000);
    await todoController.createTodo(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Todo added successfully",
      data: mockTodo,
    });

    expect(Todo.create).toHaveBeenCalledWith({
      name: mockReq.body.name,
      createdAt: 1000,
      user: mockReq.user._id,
    });
  });

  // Test case for toggleTodo
  it("should toggle the completed status of a todo", async () => {
    const mockReq = { params: { id: "todo123" }, user: { _id: "user123" } };
    const mockTodo = {
      _id: "todo123",
      completed: false,
      completedAt: null,
      user: "user123",
      save: jest.fn(),
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.spyOn(Todo, "findOne").mockResolvedValue(mockTodo);
    jest.spyOn(mockTodo, "save");
    jest.spyOn(Date, "now").mockReturnValueOnce(1000);

    await todoController.toggleTodo(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Updated successfully",
      data: mockTodo,
    });
    expect(Todo.findOne).toHaveBeenCalledWith({
      _id: mockReq.params.id,
      user: mockReq.user._id,
    });
    expect(mockTodo.completed).toBe(true);
    expect(mockTodo.completedAt).toBe(1000);
    expect(mockTodo.save).toHaveBeenCalled();
  });

  // Test case for updateTodo
  it("should update the name of a todo", async () => {
    const mockReq = {
      params: { id: "todo123" },
      body: { name: "Updated Todo" },
    };
    const mockTodo = { name: "Todo 1" };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.spyOn(Todo, "findOneAndUpdate").mockResolvedValue(mockTodo);
    // jest.spyOn(mockTodo, "save").mockResolvedValue();

    await todoController.updateTodo(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Updated successfully",
      data: mockTodo,
    });
    expect(Todo.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: mockReq.params.id },
      { name: mockReq.body.name },
      { new: true }
    );
  });

  // Test case for deleteTodo
  it("should delete a todo", async () => {
    const mockReq = { params: { id: "todo123" }, user: { _id: "user123" } };
    const mockDeletedTodo = { name: "Deleted Todo" };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.spyOn(Todo, "findByIdAndDelete").mockResolvedValue(mockDeletedTodo);

    await todoController.deleteTodo(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Todo deleted successfully",
      data: mockDeletedTodo,
    });
    expect(Todo.findByIdAndDelete).toHaveBeenCalledWith({
      _id: mockReq.params.id,
      user: mockReq.user._id,
    });
  });
});
