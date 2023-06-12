const bcrypt = require("bcryptjs");
const User = require("../models/User");
const userController = require("../controllers/user");

// Mock the dependencies
jest.mock("bcryptjs");
jest.mock("../models/User");

describe("User Login", () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockReq = {
      body: {
        email: "test@example.com",
        password: "password123",
      },
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return the logged-in user when valid credentials are provided", async () => {
    const mockUser = {
      email: "test@example.com",
      name: "Test User",
      profile: "profile.jpg",
    };

    User.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);

    await userController.login(mockReq, mockRes);

    expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
    expect(bcrypt.compare).toHaveBeenCalledWith(
      "password123",
      mockUser.password
    );
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "User Logged In Succesfully",
      data: expect.objectContaining({
        email: mockUser.email,
        name: mockUser.name,
        profile: mockUser.profile,
      }),
    });
  });

  it("should return an error when user is not found", async () => {
    User.findOne.mockResolvedValue(null);

    await userController.login(mockReq, mockRes);

    expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "User not found",
    });
  });

  it("should return an error when invalid credentials are provided", async () => {
    const mockUser = {
      email: "test@example.com",
      password: "hashedPassword",
    };

    User.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(false);

    await userController.login(mockReq, mockRes);

    expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
    expect(bcrypt.compare).toHaveBeenCalledWith(
      "password123",
      mockUser.password
    );
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Invalid credentials",
    });
  });

  it("should return an error when an exception occurs", async () => {
    const errorMessage = "Internal server error";
    User.findOne.mockRejectedValue(new Error(errorMessage));

    await userController.login(mockReq, mockRes);

    expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Internal server error",
    });
  });
});


describe("User Register", () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockReq = {
      body: {
        credentails: JSON.stringify({
          name: "Test User",
          email: "test@example.com",
          password: "password123",
        }),
        name: "Test User",
      },
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should register a new user and return user data with token", async () => {
    const mockUser = {
      _id: "123456789",
      name: "Test User",
      email: "test@example.com",
    };

    User.findOne.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue("hashedPassword");
    User.create.mockResolvedValue(mockUser);
    const mockToken = "mockToken";
    const generateAccessToken = jest.fn().mockResolvedValue(mockToken);

    await userController.register(mockReq, mockRes);
    const encryptedPassword = await bcrypt.hash("password123", 10);

    expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
    expect(bcrypt.hash).toHaveBeenCalledWith("password123", 10);
    expect(User.create).toHaveBeenCalledWith({
      name: "Test User",
      email: "test@example.com",
      password: encryptedPassword,
      profile: null,
    });
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "User registered successfully",
      data: expect.objectContaining({
        email: "test@example.com",
        name: "Test User",
        profile: null || undefined,
      }),
    });
  });

    it("should return an error if input fields are missing", async () => {
      mockReq.body.credentails = JSON.stringify({
        name: "Test User",
        email: "",
        password: "password123",
      });

      await userController.register(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "All input fields are required",
        data: null,
      });
    });

    it("should return an error if the username already exists", async () => {
      User.findOne.mockResolvedValue({ email: "test@example.com" });

      await userController.register(mockReq, mockRes);

      expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
      expect(mockRes.status).toHaveBeenCalledWith(409);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Email already exists",
        data: null,
      });
    });

    it("should handle internal server errors", async () => {
      const errorMessage = "Internal server error";

      User.findOne.mockRejectedValue(new Error(errorMessage));

      await userController.register(mockReq, mockRes);

      expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
});
