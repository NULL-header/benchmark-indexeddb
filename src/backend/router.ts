import express from "express";

export const router = express.Router().get("/api/hello", (_, res) => {
  res.send(JSON.stringify("Hello, world!"));
});
