const router = require("express").Router();
const notes = require("../../db/db.json");
const fs = require("fs");
const path = require("path");
const uniqid = require("uniqid");
router.get("/notes", (req, res) => {
  if (notes) {
    res.json(notes);
  }
});

router.post("/notes", (req, res) => {
  const newNote = req.body;
  newNote.id = uniqid().toString();
  notes.push(newNote);
  fs.writeFileSync(
    path.join(__dirname, "../../db/db.json"),
    JSON.stringify(notes, null, 2)
  );
  res.send(notes);
});
module.exports = router;
