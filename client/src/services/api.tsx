import axios, { AxiosError } from "axios";
import { BACKEND_API } from "../utils/constants";

import { TUserRegistration } from "../types";

export const postItem = async (
  {
    url,
    token,
  }: {
    url: string;
    token: string;
  },
  name: string
) => {
  let config = {
    headers: {
      "x-access-token": token,
    },
  };

  try {
    const res = await axios.post(url, { name }, config);
    return { data: res?.data, status: res?.status };
  } catch (error) {
    console.log(error)
    return handleAxiosError(error);
  }
};
export const deleteItem = async ({
  url,
  token,
  paramsId,
}: {
  url: string;
  token: string;
  paramsId: string;
}) => {
  let config = {
    headers: {
      "x-access-token": token,
    },
  };

  try {
    const res = await axios.delete(url + `/${paramsId}`, config);
    return { data: res?.data, status: res?.status };
  } catch (error) {
    return handleAxiosError(error);
  }
};

const handleAxiosError = (error: any) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;

    return { message: axiosError.message };
  } else {
    // Handle other types of errors
    return { message: error, status: undefined };
  }
};

export const updateTodoCheck = async (todoId: string, token: string) => {
  const url = `${BACKEND_API}/todo/${todoId}`;
  let config = {
    headers: {
      "x-access-token": token,
    },
  };

  try {
    const res = await axios.post(url, null, config);

    return { data: res?.data, status: res?.status };
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const updateTodoName = async ({
  todoId,
  token,
  name,
}: {
  todoId: string;
  token: string;
  name: string;
}) => {
  const url = `${BACKEND_API}/todo/${todoId}`;
  let config = {
    headers: {
      "x-access-token": token,
    },
  };

  try {
    const res = await axios.put(url, { name }, config);

    return { data: res?.data, status: res?.status };
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const uploadPhoto = async (img: any) => {
  try {
    const formData = new FormData();
    formData.append("img", img);
    formData.append("name", "s" + img.size + img.name);

    const res = await axios.post(`${BACKEND_API}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return { response: res.data, status: res.status };
  } catch (error) {
    return { response: error, status: 401 };
  }
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const res = await axios.post(`${BACKEND_API}/user/login`, credentials);
    return res;
  } catch (error) {
    const err = error as AxiosError;
    return err.response
      ? err.response
      : {
          status: err.status || 500,
          data: { message: err.message || "Something Went Wrong" },
        };
  }
};

export const registerUser = async (credentials: TUserRegistration) => {
  try {
    const formData: any = new FormData();
    formData.append(
      "credentails",
      JSON.stringify({ ...credentials, profile: null })
    );
    let url;
    if (credentials.profile) {
      formData.append("img", credentials.profile);
      formData.append(
        "name",
        "s" + credentials.profile.size + credentials.profile.name
      );
    }

    const res = await axios.post(`${BACKEND_API}/user/register`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error) {
    const err = error as AxiosError;
    return err.response
      ? err.response
      : {
          status: err.status || 500,
          data: { message: err.message || "Something Went Wrong" },
        };
  }
};
