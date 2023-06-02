import { useState, useContext } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Layout from "./pages/ProtectedLayout";
import Todos from "./pages/Todos";
import Login from "./components/Login";
import Register from "./components/Register";
import UserContext from "./context/UserContext";

import "./App.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/todo">
        <Route index element={<Todos />} />
      </Route>
    </Route>
  )
);

function App() {
  const { state } = useContext(UserContext);

  const [register, setRegister] = useState(false);

  if (!state.token) {
    return register ? (
      <Register setRegister={setRegister} />
    ) : (
      <Login setRegister={setRegister} />
    );
  }

  return <RouterProvider router={router} />;
}

export default App;
