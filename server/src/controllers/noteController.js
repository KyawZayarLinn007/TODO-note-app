const Notes = require("../models/Notes");

// GET /notes
module.exports.notes_get = async (req, res) => {
    try {
        const notes = await Notes.find({});
        res.json({
            error: null,
            data: notes
        });
    } catch (error) {
        res.json({
            error: error.message,
            data: null
        })
    }
};

// POST /notes
module.exports.notes_post = async (req, res) => {

    let { title, body } = req.body;

    try {
        const note = await Notes.create({title, body});
        res.json({
            error: null,
            data: note
        });
    } catch (error) {
        res.json({
            error: error.message,
            data: null
        })
    }
};

// PUT /notes/:noteId
module.exports.notes_put = async (req, res) => {

    let { noteId } = req.params;
    let { title, body } = req.body;

    try {
        const note = await Notes.findByIdAndUpdate(noteId, {title, body});
        res.json({
            error: null,
            data: note
        });
    } catch (error) {
        res.json({
            error: error.message,
            data: null
        })
    }
};

// DELETE /notes/:noteId
module.exports.note_delete = async (req, res) => {

    let { noteId } = req.params;

    try {
        const note = await Notes.findByIdAndDelete(noteId);
        res.json({
            error: null,
            data: note
        });
    } catch (error) {
        res.json({
            error: error.message,
            data: null
        })
    }
};