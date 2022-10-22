const Notes = require("../models/Notes");

// GET /notes/userId/:userId
module.exports.notes_get = async (req, res) => {
    let { userId } = req.params;
    try {
        const notes = await Notes.find({user_id: userId}).sort({ updatedAt: -1 });
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

// POST /notes/userId/:userId
module.exports.notes_post = async (req, res) => {
    let { userId } = req.params;
    let { title, body } = req.body;

    try {
        const note = await Notes.create({title, body, user_id: userId});
        const notes = await Notes.find({user_id: userId}).sort({ updatedAt: -1 });
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

// PUT /notes/userId/:userId/noteId/:noteId
module.exports.notes_put = async (req, res) => {
    let { userId } = req.params;
    let { noteId } = req.params;
    let { title, body } = req.body;

    try {
        const note = await Notes.updateOne({user_id: userId, _id: noteId}, {title, body});
        const notes = await Notes.find({user_id: userId}).sort({ updatedAt: -1 });
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

// DELETE /notes/userId/:userId/noteId/:noteId
module.exports.note_delete = async (req, res) => {
    let { userId } = req.params;
    let { noteId } = req.params;

    try {
        const note = await Notes.deleteOne({_id: noteId, user_id: userId});
        const notes = await Notes.find({user_id: userId}).sort({ updatedAt: -1 });
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