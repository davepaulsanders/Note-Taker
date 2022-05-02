const router = require("express").Router();
let notes = require("../../db/db.json");
const fs = require("fs");
const path = require("path");
const uniqid = require("uniqid");

router.get("/notes", (req, res) => {
  // If there are notes to get
  if (notes) {
    res.json(notes);
  }
});

router.post("/notes", (req, res) => {
  // creating a new note from the request body
  const newNote = req.body;
  // adding a unique id
  newNote.id = uniqid().toString();
  // pushing it to the notes array
  notes.push(newNote);
  // writing the updated array back into the file
  fs.writeFileSync(
    path.join(__dirname, "../../db/db.json"),
    JSON.stringify(notes, null, 2)
  );
  res.send(notes);
});

router.delete("/notes/:id", (req, res) => {
  // get id from params
  const id = req.params.id;
  // filter out the note with that id
  notes = notes.filter((note) => note.id !== id);
  // write update notes back to file
  fs.writeFileSync(
    path.join(__dirname, "../../db/db.json"),
    JSON.stringify(notes, null, 2)
  );
  res.send(notes);
});
module.exports = router;
