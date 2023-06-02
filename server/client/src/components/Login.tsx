import React, { useState, useContext } from "react";
import { Formik } from "formik";

import UserContext from "../context/UserContext";
import { loginUser } from "../utils/api";
import ModalMsg from "./ModalMsg";
import { LoginSchema } from "../utils/constants";
import LoadingSpinner from "./LoadingSpinner";

type Props = {
  setRegister: (val: boolean) => void;
};

const Login = ({ setRegister }: Props) => {
  const { setState } = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmission = async (values: any, { setSubmitting }: any) => {
    setIsLoading(true);
    const res = await loginUser(values);
    if (res?.status === 200) setState.setUser({ ...res.data.data });
    else setError(res?.data);
    setIsLoading(false);
    setSubmitting(false);
  };

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmission}
        validationSchema={LoginSchema}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            isSubmitting,
            handleChange: handleChangeFormik,
            handleBlur,
            handleSubmit,
          } = props;

          const changeHandler = (e: any) => {
            setError(null);
            handleChangeFormik(e);
          };
          return (
            <div className="flex items-center justify-center min-h-screen p-4 bg-transparent lg:justify-center">
              <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
                <div className="p-4 py-6 text-white hidden bg-secondary md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
                  <div className="my-3 text-4xl font-bold tracking-wider text-center">
                    <a href="#">Cowlar Todo</a>
                  </div>
                  <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
                    With the power of the app, Never forget again what you need
                    to do you can add all the todos for yourself and track all
                    the necessary things you need to do.
                  </p>
                  <p className="flex flex-col items-center justify-center mt-10 text-center">
                    <span>Don't have an account?</span>
                    <span
                      className="underline cursor-pointer"
                      onClick={() => setRegister(true)}
                    >
                      Get Started!
                    </span>
                  </p>
                  <p className="mt-6 text-sm text-center text-gray-300">
                    Read our <span className="underline">terms</span> and{" "}
                    <span className="underline">conditions</span>
                  </p>
                </div>
                <div className="relative p-5 bg-white flex-1 md:flex-1">
                  <form
                    className={`flex flex-col space-y-5 ${
                      isLoading ? "opacity-25" : ""
                    }`}
                    onSubmit={handleSubmit}
                  >
                    <h3 className="mt-1 text-2xl font-semibold text-gray-700">
                      Account Login
                    </h3>
                    <div className="flex flex-col space-y-1">
                      <label
                        htmlFor="email"
                        className="text-sm font-semibold text-gray-500"
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={values.email}
                        onChange={changeHandler}
                        onBlur={handleBlur}
                        className={`px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 ${
                          errors.email && touched.email
                            ? "focus:ring-red-200"
                            : "focus:ring-action"
                        }`}
                      />
                      {errors.email && touched.email && (
                        <div className="text-red-500">{errors.email}</div>
                      )}
                    </div>
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="password"
                          className="text-sm font-semibold text-gray-500"
                        >
                          Password
                        </label>
                        <span
                          onClick={setIsOpen.bind(null, true)}
                          className="text-sm text-action hover:underline cursor-pointer"
                        >
                          Forgot Password?
                        </span>
                      </div>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={values.password}
                        onChange={changeHandler}
                        onBlur={handleBlur}
                        className={`px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 ${
                          errors.password && touched.password
                            ? "focus:ring-red-200"
                            : "focus:ring-action"
                        }`}
                      />
                      {errors.password && touched.password && (
                        <div className="text-red-500">{errors.password}</div>
                      )}
                      {error && (
                        <div className="text-red-500 text-right">{error}</div>
                      )}
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="w-full px-4 py-2 mt-6 text-lg font-semibold text-white duration-300 transition-all bg-gradient-to-b from-actionlgt via-action to-actiondrk bg-opacity-50 rounded-md shadow hover:from-actiondrk hover:via-action hover:to-actionlgt hover:bg-opacity-75 hover:text-opacity-100 focus:outline-none focus:ring-action focus:ring-4"
                        disabled={isSubmitting}
                      >
                        Log in
                      </button>
                    </div>
                  </form>
                  {isLoading && (
                    <div className="absolute top-1/2 left-1/2 -translate-y-6 -translate-x-1/2 w-9 h-9">
                      <LoadingSpinner />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        }}
      </Formik>

      {isOpen && (
        <ModalMsg
          setIsOpen={setIsOpen}
          message="This feature is under development check back soon!!"
        ></ModalMsg>
      )}
    </>
  );
};

export default Login;
