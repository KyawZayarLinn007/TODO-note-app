const express = require("express");
const { notes_get, notes_post, notes_put, note_delete } = require("../controllers/noteController");
const router = express.Router();
const { requireAuth } = require("../middlewares/requireAuth");

router.get("/userId/:userId", requireAuth, notes_get);
router.post("/userId/:userId", requireAuth, notes_post);
router.put("/userId/:userId/noteId/:noteId", requireAuth, notes_put);
router.delete("/userId/:userId/noteId/:noteId", requireAuth, note_delete);

module.exports = router;