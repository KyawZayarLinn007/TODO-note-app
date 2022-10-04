const express = require("express");
const { notes_get, notes_post, notes_put, note_delete } = require("../controllers/noteController");
const router = express.Router();

router.get("/", notes_get);
router.post("/", notes_post);
router.put("/:noteId", notes_put);
router.delete("/:noteId", note_delete);

module.exports = router;