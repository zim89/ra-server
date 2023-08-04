const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const moment = require("moment");

const notesPath = path.join(__dirname, "notes.json");

const listNotes = async () => {
  const result = await fs.readFile(notesPath);
  return JSON.parse(result);
};

const getNoteById = async (noteId) => {
  const notes = await listNotes();
  const result = notes.find(({ id }) => id === noteId);
  return result || null;
};

const removeNote = async (id) => {
  const notes = await listNotes();
  const index = notes.findIndex((note) => note.id === id);
  if (index === -1) return null;
  const deleteNote = notes[index];
  notes.splice(index, 1);
  await fs.writeFile(notesPath, JSON.stringify(notes, null, 2));
  return deleteNote;
};

const addNote = async (body) => {
  const notes = await listNotes();
  const { name, category, content, date } = body;
  const dates = [];

  if (moment(date).isValid()) {
    dates.push(moment(date).format("DD.MM.YYYY"));
  }

  const newNote = {
    id: nanoid(),
    created_at: moment().format("DD.MM.YYYY hh:mm:ss"),
    name,
    category,
    content,
    dates,
    isArchived: false,
  };
  notes.push(newNote);
  await fs.writeFile(notesPath, JSON.stringify(notes, null, 2));
  return newNote;
};

const updateNote = async (id, body) => {
  const { name, category, content, date, isArchived } = body;
  const notes = await listNotes();
  const index = notes.findIndex((note) => note.id === id);

  if (index === -1) return null;

  if (moment(date).isValid()) {
    notes[index].dates.push(moment(date).format("DD.MM.YYYY"));
  }

  notes[index] = { ...notes[index], name, category, content, isArchived };
  await fs.writeFile(notesPath, JSON.stringify(notes, null, 2));
  return notes[index];
};

module.exports = {
  listNotes,
  getNoteById,
  removeNote,
  addNote,
  updateNote,
};
