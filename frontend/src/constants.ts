import env from "react-dotenv";

export const API_URL =
  process.env.NODE_ENV === "development" ? env.API_URL_DEV : env.API_URL_PROD;
