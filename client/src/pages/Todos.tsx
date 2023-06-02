import React, {
  ChangeEvent,
  KeyboardEvent,
  useContext,
  useRef,
  useState,
} from "react";
import useFetch from "../hooks/useFetch";
import {
  deleteItem,
  postItem,
  updateTodoCheck,
  updateTodoName,
} from "../utils/api";
import UserContext from "../context/UserContext";

import InputField from "../components/InputField";
import LoadingSpinner from "../components/LoadingSpinner";
import { BACKEND_API, FALL_BACK_DP } from "../utils/constants";
import TodoItem from "../components/TodoItem";
import NavigationBar from "../components/NavigationBar";

const Todos = () => {
  const [menuAppear, setMenuAppear] = useState(-1);
  const [timeframe, setTimeframe] = useState("today");
  const [hideTodo, setHideTodo] = useState(false);

  const { state } = useContext(UserContext);
  const {
    response: todos,
    setResponse: setTodos,
    loading,
    fetchData,
  } = useFetch(`${BACKEND_API}/todo`, {
    token: state.token,
    query: timeframe,
  });
  const trackRecentTodos = useRef(-1);

  const postNewTodo = async (name: string) => {
    const config = {
      url: `${BACKEND_API}/todo`,
      token: state.token,
    };

    trackRecentTodos.current++;
    setTodos([{ name: name }, ...todos]);
    await postItem(config, name);
    await fetchData();
    trackRecentTodos.current--;
  };

  const handleDeleteTodo = async (index: number, todoId: string) => {
    const config = {
      url: `${BACKEND_API}/todo`,
      token: state.token,
      paramsId: todoId,
    };

    let copyOfTodos = [...todos];
    const cachedTodo = copyOfTodos[index];
    copyOfTodos = copyOfTodos.filter((todo) => todo._id !== todoId);
    console.log(copyOfTodos);
    setTodos(copyOfTodos);
    setMenuAppear(-1);

    const res = await deleteItem(config);
    if (res?.status !== 200) {
      copyOfTodos.splice(index, 0, cachedTodo);
      setTodos([...copyOfTodos]);
    }
  };

  const handleCheckTodo = async (index: number, todoId: string) => {
    const copyOfTodos = [...todos];
    const cachedTodo = copyOfTodos[index];
    copyOfTodos[index].completed = !copyOfTodos[index].completed;
    copyOfTodos[index].completedAt = copyOfTodos[index].completed
      ? Date.now()
      : null;
    setTodos([...copyOfTodos]);

    const res = await updateTodoCheck(todoId, state.token);
    if (res?.status !== 200) {
      copyOfTodos[index] = cachedTodo;
      setTodos([...copyOfTodos]);
    }
  };

  const handleEditTodo = async (
    todoId: string,
    index: number,
    name: string
  ) => {
    const copyOfTodos = [...todos];
    const cachedTodo = copyOfTodos[index];
    copyOfTodos[index] = { ...copyOfTodos[index], name };
    setTodos([...copyOfTodos]);
    console.log(todoId);
    const res = await updateTodoName({ todoId, token: state.token, name });
    if (res?.status !== 200) {
      copyOfTodos[index] = cachedTodo;
      console.log(copyOfTodos);
      setTodos([...copyOfTodos]);
    }
  };

  const handleTimeframeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTodos(null);
    setTimeframe(e.target.value);
  };

  const handleMenuAppear = async (index: number) => {
    menuAppear === index ? setMenuAppear(-1) : setMenuAppear(index);
  };

  return (
    <div className="m-auto max-w-fit min-w-[300px] md:min-w-fit">
      <div className="relative">
        <img
          src={state.profile || FALL_BACK_DP}
          className="w-24 m-auto mb-10 border-2 border-gradient-to-r from-teal-500 to-green-500 rounded-full aspect-square object-cover peer"
          alt=""
        />
        <span className="absolute left-1/4 top-full hidden bg-black text-white px-1 rounded peer-hover:block transition-all">
          {state.email}
        </span>
      </div>

      <NavigationBar
        handleTimeframeChange={handleTimeframeChange}
        setHideTodos={setHideTodo}
        hideTodos={hideTodo}
      />
      <div
        className={`${
          !hideTodo ? "animation-expand" : "animation-fade-out"
        } h-72`}
      >
        {/* {!hideTodo && ( */}
        <div className="flex flex-col bg-primary rounded-md drop-shadow-2xl h-72 w-full overflow-auto ">
          {todos || !loading ? (
            todos?.length ? (
              todos.map((todo: any, index: number) => {
                return (
                  <TodoItem
                    todo={todo}
                    index={index}
                    menuAppear={menuAppear}
                    trackRecentTodos={trackRecentTodos}
                    handleMenuAppear={handleMenuAppear}
                    handleCheckTodo={handleCheckTodo}
                    handleDeleteTodo={handleDeleteTodo}
                    handleEditTodo={handleEditTodo}
                  />
                );
              })
            ) : (
              <p className="text-gray-500 text-xl font-semibold m-auto">
                {timeframe === "today"
                  ? `No Todos found for today`
                  : `No Todos this ${timeframe}`}
              </p>
            )
          ) : (
            <div className="w-10 m-auto">
              <LoadingSpinner />
            </div>
          )}
        </div>
        {/* )} */}
      </div>

      <InputField postNewTodo={postNewTodo} />
    </div>
  );
};

export default Todos;
