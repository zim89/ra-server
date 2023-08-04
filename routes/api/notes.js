const express = require("express");

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.json({ message: "Get all notes" });
});

router.get("/:noteId", async (req, res, next) => {
  res.json({ message: "Get note by id" });
});

router.post("/", async (req, res, next) => {
  res.json({ message: "Add note" });
});

router.delete("/:noteId", async (req, res, next) => {
  res.json({ message: "Delete note" });
});

router.put("/:noteId", async (req, res, next) => {
  res.json({ message: "Update note" });
});

module.exports = router;
