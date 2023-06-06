import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import Todos from "./Todos";
import useFetch from "../hooks/useFetch";
import {
  deleteItem,
  postItem,
  updateTodoCheck,
  updateTodoName,
} from "../services/api";

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

jest.mock("../services/api", () => ({
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

  test("delete todo", async () => {
    deleteItem.mockResolvedValueOnce({ status: 200 });

    fireEvent.click(screen.getByTestId("deletemenu-0"));
    fireEvent.click(screen.getByTestId("deletebtn-0"));

    await waitFor(() => {
      expect(deleteItem).toHaveBeenCalledTimes(1);
    });

    // // Assert the updated component state
    await waitFor(() => {
      const deletedElement = screen.queryByText("Todo 1");
      expect(deletedElement).not.toBeInTheDocument();
    });
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
    postItem.mockResolvedValueOnce({ status: 200 });

    fireEvent.click(screen.getByTestId("addbtn"));
    const todoField = screen.getByTestId("todo-field");
    userEvent.type(todoField, "New Todo");
    await waitFor(() => {
      expect(todoField).toHaveValue("New Todo");
    });

    fireEvent.click(screen.getByTestId("postbtn"));

    // Expect the postItem function to be called
    await waitFor(() => {
      expect(postItem).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(mockFetchData).toHaveBeenCalledTimes(1);
    });
  });

  test("edit todo", async () => {
    updateTodoName.mockResolvedValueOnce({ status: 200 });

    const todo2 = screen.getByText("Todo 2");
    fireEvent.click(todo2);
    const todo2InputField = screen.getByTestId("editfield-1");
    userEvent.type(todo2InputField, "New Todo");
    fireEvent.keyDown(todo2InputField, {
      key: "Enter",
      code: 13,
      charCode: 13,
    });

    expect(updateTodoName).toHaveBeenCalledTimes(1);

    // // // Assert the updated component state
    await waitFor(() => {
      const updatedTodo = screen.getByText("New Todo");
      expect(updatedTodo).toBeInTheDocument();
    });
  });

  test("check/uncheck todo", async () => {
    updateTodoCheck.mockResolvedValueOnce({ status: 200 });

    const checkbox = screen.getByTestId("checkbox-1");
    expect(checkbox.checked).toEqual(true);
    fireEvent.click(checkbox);

    expect(updateTodoCheck).toHaveBeenCalledTimes(1);
  });
});
