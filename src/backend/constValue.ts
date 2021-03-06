import Dotenv from "dotenv";

Dotenv.config();

export const constValue = {
  PORT: parseInt(process.env.PORT as string, 10),
};
