import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";

import useFetch from "../hooks/useFetch";
import {
  deleteItem,
  postItem,
  updateTodoCheck,
  updateTodoName,
} from "../services/api";
import UserContext from "../context/UserContext";

import InputField from "../components/InputField";
import LoadingSpinner from "../components/LoadingSpinner";
import { BACKEND_API, FALL_BACK_DP } from "../utils/constants";
import TodoItem from "../components/TodoItem";
import NavigationBar from "../components/NavigationBar";
import { TTodoItem } from "../types";
import { updateToatify } from "../utils/helperFunction";

const Todos = () => {
  const [menuAppear, setMenuAppear] = useState(-1);
  const [timeframe, setTimeframe] = useState("today");
  const [hideTodo, setHideTodo] = useState(false);

  const { state } = useContext(UserContext);
  const {
    response: todos,
    setResponse: setTodos,
    error,
    loading,
    fetchData,
  } = useFetch(`${BACKEND_API}/todo`, {
    token: state.token,
    query: timeframe,
  });
  const trackRecentTodos = useRef(-1);

  const filterUnPostedTodos = () => {
    setTodos((prev: any) => {
      const todos = prev || [];
      return todos.filter(
        (_: any, index: number) => index > trackRecentTodos.current
      );
    });
  };

  const postNewTodo = async (name: string) => {
    const config = {
      url: `${BACKEND_API}/todo`,
      token: state.token,
    };
    trackRecentTodos.current++;

    setTodos((prevTodo: any) => [{ name: name }, ...(prevTodo || [])]);

    const toastId = toast.loading("Adding to DB Please wait...");
    const res = await postItem(config, name);
    const fetchRes = await fetchData();

    if (res.status !== 200) {
      updateToatify({
        toastId,
        type: "error",
      });
    }

    if (!fetchRes.success && res.status !== 200) {
      filterUnPostedTodos();
      trackRecentTodos.current--;
      return;
    }

    trackRecentTodos.current--;

    updateToatify({
      toastId,
      type: "success",
    });
  };

  const handleDeleteTodo = async (index: number, todoId: string) => {
    console.log(index);
    const config = {
      url: `${BACKEND_API}/todo`,
      token: state.token,
      paramsId: todoId,
    };

    // let copyOfTodos = [...todos];
    const cachedTodo = { ...todos[index] };
    // const copyOfTodos =
    setTodos((prevTodos: any) => {
      return prevTodos.filter((todo: any) => todo._id !== todoId);
    });

    setMenuAppear(-1);

    const toastId = toast.loading("Deleting from DB Please wait...");
    const res = await deleteItem(config);
    if (res?.status !== 200) {
      // copyOfTodos.splice(index, 0, cachedTodo);
      setTodos((prevTodos: any) => {
        const newTodos = [...prevTodos];
        console.log(index);
        newTodos.splice(index, 0, cachedTodo);
        return newTodos;
      });
      updateToatify({
        toastId,
        type: "error",
      });
      return;
    }

    updateToatify({
      toastId,
      type: "success",
    });
  };

  const handleCheckTodo = async (index: number, todoId: string) => {
    const copyOfTodos = [...todos];
    const cachedTodo = { ...copyOfTodos[index] };

    copyOfTodos[index].completed = !copyOfTodos[index].completed;
    copyOfTodos[index].completedAt = copyOfTodos[index].completed
      ? Date.now()
      : null;
    setTodos((prevTodos: any) => {
      const newTodos = [...prevTodos];
      newTodos[index] = copyOfTodos[index];
      return newTodos;
    });

    const toastId = toast.loading("Updating DB Please wait...");
    const res = await updateTodoCheck(todoId, state.token);
    if (res?.status !== 200) {
      copyOfTodos[index] = cachedTodo;
      setTodos((prevTodos: any) => {
        const newTodos = [...prevTodos];
        newTodos[index] = cachedTodo;
        return newTodos;
      });
      updateToatify({
        toastId,
        type: "error",
      });
      return;
    }

    updateToatify({
      toastId,
      type: "success",
    });
  };

  const handleEditTodo = async (
    todoId: string,
    index: number,
    name: string
  ) => {
    const cachedTodo = { ...todos[index] };

    setTodos((prevTodos: any) => {
      const copyOfTodos = [...prevTodos];
      copyOfTodos[index] = { ...copyOfTodos[index], name };
      return copyOfTodos;
    });
    const toastId = toast.loading("Updating DB Please wait...");

    const res = await updateTodoName({ todoId, token: state.token, name });
    if (res?.status !== 200) {
      setTodos((prevTodos: any) => {
        const newTodos = [...prevTodos];
        newTodos[index] = cachedTodo;
        return newTodos;
      });
      updateToatify({
        toastId,
        type: "error",
      });
      return;
    }

    updateToatify({
      toastId,
      type: "success",
    });
  };

  const handleTimeframeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTodos(null);
    setTimeframe(e.target.value);
  };

  const handleMenuAppear = async (index: number) => {
    menuAppear === index ? setMenuAppear(-1) : setMenuAppear(index);
  };

  useEffect(() => {
    if (error) {
      toast.error(error.response?.data?.error || error.message);
    }
  }, [error]);

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
      <InputField postNewTodo={postNewTodo} />

      <div
        className={`${
          !hideTodo ? "animation-expand" : "animation-fade-out"
        } h-72`}
      >
        <div className="flex flex-col bg-primary rounded-md drop-shadow-2xl h-72 w-full overflow-auto ">
          {todos || !loading ? (
            todos?.length ? (
              todos.map((todo: TTodoItem, index: number) => {
                return (
                  <TodoItem
                    key={index}
                    index={index}
                    todo={todo}
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
    </div>
  );
};

export default Todos;
