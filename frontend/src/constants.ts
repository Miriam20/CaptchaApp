import env from "react-dotenv";

export const API_URL =
  process.env.NODE_ENV === "production" ? env.API_URL_PROD : env.API_URL_DEV;
