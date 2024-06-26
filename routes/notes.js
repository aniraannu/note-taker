const notes = require('express').Router();
const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('../helpers/fsUtils');

const uuid = require('../helpers/uuid');

//GET route for retrieving all the notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});
// POST Route for submitting notes
notes.post("/", (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
        const newNotes = {
            title,
            text,
            note_id: uuid(),
        };

        readAndAppend(newNotes, "./db/db.json");

        const response = {
            status: "success",
            body: newNotes,
        };

        res.json(response);
    } else {
        res.json("Error in posting notes");
    }
});
// DELETE Route for deleting notes
notes.delete("/:note_id", (req, res) => {
    const noteId = req.params.note_id;
    readFromFile("./db/db.json")
        .then((data) => JSON.parse(data))
        .then((json) => {
            console.log(json);
            const result = json.filter((note) => note.note_id !== noteId);
            writeToFile("./db/db.json", result);
            res.json(`Item ${noteId} has been deleted :wastebasket:`);
        });
});

module.exports = notes;