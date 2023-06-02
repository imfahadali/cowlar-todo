import { useContext } from "react";

import UserContext from "../context/UserContext";
import { ITokenProps } from "../types";
import { FALL_BACK_DP } from "../utils/constants";

const TopBar = () => {
  const { state, setState } = useContext(UserContext);
  return (
    <div className="flex flex-row justify-end  items-center p-3 fixed top-0 w-full bg-transparent drop-shadow-lg">
      <button
        className="rounded text-white bg-action hover:bg-action/75 py-2 px-4 mr-1 text-sm"
        onClick={() => setState.setUser(null)}
      >
        Logout
      </button>
    </div>
  );
};

export default TopBar;
