import * as Yup from "yup";
import { IBarSeries } from "../types";

export const BACKEND_API = import.meta.env.VITE_BACKEND_API;

export const FALL_BACK_DP =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP17y9FJz4C1ISLKROmJPGkXn0F4mnaEeEjA&usqp=CAU";

export const RegistrationValidation = Yup.object().shape({
  email: Yup.string().email().required("Required"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short- should be 8 chars min.")
    .matches(/(?=.*[0-9])/, "Password must contain a number."),
  name: Yup.string()
    .required("Required")
    .min(5, "Name is too short- should be 5 chars min."),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required("Required"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short- should be 8 chars min.")
    .matches(/(?=.*[0-9])/, "Password must contain a number."),
});
