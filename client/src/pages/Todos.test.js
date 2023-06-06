import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  getByText,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import Todos from "./Todos";
import TodoItem from "../components/TodoItem";
import useFetch from "../hooks/useFetch";
import { postItem } from "../services/api";

let mockResponse = [
  { id: 1, name: "Todo 1", completed: false },
  { id: 2, name: "Todo 2", completed: true },
];

const mockSetResponse = jest.fn((newResponse) => {
  mockResponse = newResponse;
});

const mockFetchData = jest.fn();

jest.mock("../hooks/useFetch", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    response: mockResponse,
    setResponse: mockSetResponse,
    loading: false,
    fetchData: mockFetchData,
  })),
}));

jest.mock("../utils/api", () => ({
  __esModule: true,
  postItem: jest.fn(),
  deleteItem: jest.fn(),
  updateTodoCheck: jest.fn(),
  updateTodoName: jest.fn(),
}));

describe("Todos", () => {
  beforeEach(() => {
    render(<Todos />);
  });

  test("renders todos correctly", () => {
    // Check if todos are rendered
    const todo1 = screen.getByText("Todo 1");
    const todo2 = screen.getByText("Todo 2");
    expect(todo1).toBeInTheDocument();
    expect(todo2).toBeInTheDocument();

    // Check if completed todo is marked as completed
    expect(todo2).toHaveClass("line-through");
  });

  test("add todo", async () => {
    useFetch.mockImplementation(() => ({
      response: [
        { id: 1, name: "Todo 1", completed: false },
        { id: 2, name: "Todo 2", completed: true },
        { id: 3, name: "New Todo", completed: false },
      ],
      setResponse: mockSetResponse,
      loading: false,
      fetchData: mockFetchData,
    }));
    postItem.mockResolvedValueOnce({
      data: {
        data: { _id: "3", name: "New Todo", completed: false },
      },
    });

    fireEvent.click(screen.getByTestId("addbtn"));
    userEvent.type(screen.getByTestId("todo-field"), "New Todo");
    await waitFor(() => {
      const inputField = screen.getByTestId("todo-field");
      expect(inputField).toHaveValue("New Todo");
    });
    fireEvent.click(screen.getByTestId("postbtn"));

    // Expect the postItem function to be called
    await waitFor(() => {
      expect(postItem).toHaveBeenCalledTimes(1);
    });

    // useFetch().fetchData();

    // Expect the fetchData function to be called
    await waitFor(() => {
      expect(mockFetchData).toHaveBeenCalledTimes(1);
    });
    // Expect the new todo to be in the document
  });
});
