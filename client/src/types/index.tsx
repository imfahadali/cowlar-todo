import { File } from "buffer";

export enum PriorityColor {
  high = "red",
  medium = "yellow",
  low = "green",
}

export type TSetToken = (token: string | null) => void;

export interface ITokenProps {
  setToken: TSetToken;
}

export type TUserContext = {
  email: string;
  name: string;
  profile: string | null | undefined;
  token: string;
};

export type TTodoItem = {
  _id: string;
  name: string;
  completed: boolean;
  completedAt: string;
  createdAt: string;
  user: string;
};

export type TUserRegistration = {
  email: string;
  password: string;
  name: string;
  profile: File | null;
};
