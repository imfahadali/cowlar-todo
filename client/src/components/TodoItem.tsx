import React, {
  MutableRefObject,
  useState,
  useEffect,
  KeyboardEvent,
} from "react";
import { TTodoItem } from "../types";

interface ITodoItemProps {
  todo: TTodoItem;
  index: number;
  menuAppear: number;
  trackRecentTodos: MutableRefObject<number>;
  handleEditTodo: (id: string, indx: number, name: string) => Promise<void>;
  handleMenuAppear: (indx: number) => void;
  handleCheckTodo: (indx: number, todoId: string) => Promise<void>;
  handleDeleteTodo: (indx: number, todoId: string) => Promise<void>;
}

const TodoItem = ({
  todo,
  index,
  menuAppear,
  trackRecentTodos,
  handleMenuAppear,
  handleCheckTodo,
  handleDeleteTodo,
  handleEditTodo,
}: ITodoItemProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableTodo, setEditableTodo] = useState(todo);
  const callEditTodo = () => {
    if(todo.name === editableTodo.name) return setIsEditMode(false)
    handleEditTodo(editableTodo._id, index, editableTodo.name);
    setIsEditMode(false);
    // setEditableTodo(todo.name);
  };
  const handleEnterEdit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && editableTodo.name.trim() !== "") {
      callEditTodo();
    }
  };

  useEffect(() => {
    setEditableTodo(todo);
  }, [todo]);

  return (
    <div
      className={`${
        index <= trackRecentTodos.current
          ? "opacity-25 pointer-events-none"
          : ""
      } p-4 border-b border-secondary/50 text-secondarydrkst last:border-none relative flex justify-start items-center `}
      style={{ transitionDelay: `${index * 100}ms` }}
      key={index}
    >
      <div className="form-group flex mr-3">
        <input
          data-testid={`checkbox-${index}`}
          type="checkbox"
          id={`${editableTodo._id}`}
          checked={editableTodo.completed || false}
          onChange={() => handleCheckTodo(index, editableTodo._id)}
        />
        <label htmlFor={`${editableTodo._id}`} />
      </div>
      {isEditMode ? (
        <input
          data-testid={`editfield-${index}`}
          type="text"
          value={editableTodo.name || ""}
          className="bg-transparent outline-none border-black"
          onChange={(e) => {
            setEditableTodo({ ...editableTodo, name: e.target.value });
          }}
          onBlur={callEditTodo}
          onKeyDown={handleEnterEdit}
          autoFocus
        />
      ) : (
        <span
          onClick={setIsEditMode.bind(null, true)}
          className={`${editableTodo.completed ? "line-through" : ""}`}
        >
          {editableTodo.name}
        </span>
      )}

      <img
        data-testid={`deletemenu-${index}`}
        src="/src/assets/dots.svg"
        width={20}
        alt=""
        className="inline ml-auto"
        onClick={handleMenuAppear.bind(null, index)}
      />
      {index == menuAppear && (
        <div className="bg-gray-900 right-4 top-10 rounded absolute z-10 ">
          {/* <div className="border-b border-gray-500 p-2">edit</div> */}
          <div
            data-testid={`deletebtn-${index}`}
            className="text-red-500 p-2 cursor-pointer"
            onClick={handleDeleteTodo.bind(null, index, editableTodo._id)}
          >
            delete
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
