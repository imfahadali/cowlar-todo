import React, { MutableRefObject, useState, useEffect } from "react";

interface ITodoItemProps {
  todo: any;
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
  const handleBlur = () => {
    // console.log(editableTodo._id)
    handleEditTodo(editableTodo._id, index, editableTodo.name);
    setIsEditMode(false);
    // setEditableTodo(todo.name);
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
    >
      <div className="form-group flex mr-3">
        <input
          type="checkbox"
          id={`${editableTodo._id}`}
          checked={editableTodo.completed}
          onChange={() => handleCheckTodo(index, editableTodo._id)}
          onBlur={handleBlur}
        />
        <label htmlFor={`${editableTodo._id}`} />
      </div>
      {isEditMode ? (
        <input
          type="text"
          value={editableTodo.name}
          className="bg-transparent outline-none border-black"
          onChange={(e) => {
            console.log(editableTodo);
            setEditableTodo({ ...editableTodo, name: e.target.value });
          }}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <span onClick={setIsEditMode.bind(null, true)}>
          {editableTodo.name}
        </span>
      )}

      <img
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


