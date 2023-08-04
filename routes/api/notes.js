const express = require("express");
const Joi = require("joi");
const notes = require("../../models/notes");
const { HttpError } = require("../../helpers");

const router = express.Router();

const addNoteSchema = Joi.object({
  name: Joi.string().trim().required(),
  category: Joi.string().trim().required(),
  content: Joi.string().trim().required(),
  date: Joi.any(),
});

const updateNoteSchema = Joi.object({
  name: Joi.string().trim().required(),
  category: Joi.string().trim().required(),
  content: Joi.string().trim().required(),
  date: Joi.any(),
  isArchived: Joi.boolean().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await notes.listNotes();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:noteId", async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const result = await notes.getNoteById(noteId);
    if (!result) throw HttpError(404, "Note not found");
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addNoteSchema.validate(req.body);
    if (error) throw HttpError(400, error.message);
    const result = await notes.addNote(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:noteId", async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const result = await notes.removeNote(noteId);
    if (!result) throw HttpError(404, "Note not found");
    res.json({ message: "Delete success" });
  } catch (error) {
    next(error);
  }
});

router.patch("/:noteId", async (req, res, next) => {
  try {
    const { error } = updateNoteSchema.validate(req.body);
    if (error) throw HttpError(400, error.message);
    const { noteId } = req.params;
    const result = await notes.updateNote(noteId, req.body);
    if (!result) throw HttpError(404, "Note not found");
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
