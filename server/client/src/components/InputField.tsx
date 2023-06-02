import React, { useState, ChangeEvent, KeyboardEvent } from "react";

interface IInputFieldProps {
  postNewTodo: (name: string) => Promise<void>;
}
const InputField = ({ postNewTodo }: IInputFieldProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setError("");
  };

  const handleButtonSubmission = async () => {
    if (inputValue.trim() === "") {
      setError("Please enter a value.");
      return;
    }
    const cachedInput = inputValue;
    setInputValue("");
    await postNewTodo(cachedInput);
    setInputValue("");
  };

  const handleEnterSubmisson = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (inputValue.trim() === "") {
        setError("Please enter a value.");
        return;
      }

      const cachedInput = inputValue;
      setInputValue("");
      await postNewTodo(cachedInput);
    }
  };

  return (
    <div className="relative">
      {isInputVisible ? (
        <button
          className="px-4 py-2 mt-2 bg-gradient-to-b from-actionlgt via-action to-actiondrk bg-opacity-50  text-white w-full rounded-md opacity-100 transition-opacity duration-300"
          onClick={handleButtonSubmission}
          // onClick={() => setIsInputVisible((prev) => !prev)}
        >
          Post
        </button>
      ) : (
        <button
          className="px-4 py-2 mt-2 bg-gradient-to-b from-actionlgt via-action to-actiondrk bg-opacity-50  text-white w-full rounded-md opacity-100 transition-opacity duration-300"
          // onClick={handleButtonSubmission}
          onClick={() => setIsInputVisible((prev) => !prev)}
        >
          Post
        </button>
      )}
      <div
        className={`relative my-2 transition-all ${
          isInputVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {isInputVisible && (
          <>
            <input
              type="text"
              className="absolute left-0 bg-transparent shadow-2xl  border border-secondary px-2 py-3 w-full rounded-md outline-none text-primary text-sm  duration-300 z-10 placeholder:text-primary"
              placeholder={error || "Add to do"}
              value={inputValue}
              // disabled={}
              onKeyDown={handleEnterSubmisson}
              onChange={handleInputChange}
              onBlur={setIsInputVisible.bind(null, false)}
              autoFocus
              required
            />
            <img
              src="/src/assets/xmark-solid.svg"
              alt=""
              className="w-3 absolute z-20 top-3 right-3 cursor-pointer"
              onClick={setIsInputVisible.bind(null, false)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default InputField;
