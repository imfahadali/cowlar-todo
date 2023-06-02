import axios, { AxiosError } from "axios";
import { BACKEND_API } from "./constants";
import { getBase64 } from "./helperFunction";

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

  const res = await axios.post(url, { name }, config);
  if (res.status !== 200) return { error: "couldn't fetch", status: 404 };

  return res?.data;
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

    console.log(error);
    return { message: axiosError.message };
  } else {
    // Handle other types of errors
    console.log("Error:", error);
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

export const uploadPhoto = async (img: File) => {
  try {
    const res = await axios.post(`${BACKEND_API}/upload`, {
      imgBase64: await getBase64(img),
      name: "s" + img.size + img.name,
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
    return err.response;
  }
};

export const registerUser = async (credentials: {
  email: string;
  password: string;
  name: string;
  profile?: File;
}) => {
  try {
    let url;
    if (credentials.profile) {
      console.log(credentials.profile);
      const { response, status } = await uploadPhoto(credentials.profile);
      url = response.location;
    }

    const res = await axios.post(`${BACKEND_API}/user/register`, {
      ...credentials,
      profile: url,
    });
    return res;
  } catch (error) {
    const err = error as AxiosError;
    return err.response;
  }
};
