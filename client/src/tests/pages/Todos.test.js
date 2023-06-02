import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Todos from "../../pages/Todos";

describe("Todos Component", () => {
  test("renders the component without errors", () => {
    render(<Todos />);
    // Assert that the component renders without throwing any errors
  });

  test("displays loading spinner while fetching todos", () => {
    render(<Todos />);
    const loadingSpinner = screen.getByTestId("loading-spinner");
    expect(loadingSpinner).toBeInTheDocument();
  });

  test('displays "No Todos found" message when no todos are available', () => {
    render(<Todos />);
    const noTodosMessage = screen.getByText(/No Todos found/i);
    expect(noTodosMessage).toBeInTheDocument();
  });

  test("displays todos when they are fetched successfully", () => {
    // Mock the useFetch hook to return mocked todos data
    jest.mock("../hooks/useFetch", () => ({
      __esModule: true,
      default: () => ({
        response: [
          { name: "Todo 1", completed: false },
          { name: "Todo 2", completed: true },
        ],
        setResponse: jest.fn(),
        loading: false,
        fetchData: jest.fn(),
      }),
    }));

    render(<Todos />);
    const todoItems = screen.getAllByTestId("todo-item");
    expect(todoItems.length).toBe(2);
  });

  test("allows adding a new todo", () => {
    // Mock the useFetch hook to return mocked todos data
    jest.mock("../hooks/useFetch", () => ({
      __esModule: true,
      default: () => ({
        response: [],
        setResponse: jest.fn(),
        loading: false,
        fetchData: jest.fn(),
      }),
    }));

    render(<Todos />);
    const inputField = screen.getByPlaceholderText(/Add new todo/i);
    const addButton = screen.getByText(/Add/i);

    fireEvent.change(inputField, { target: { value: "New Todo" } });
    fireEvent.click(addButton);

    const todoItems = screen.getAllByTestId("todo-item");
    expect(todoItems.length).toBe(1);
  });

  // Add more test cases to cover other functionalities and scenarios of the Todos component
});
