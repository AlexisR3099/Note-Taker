const fs = require('fs');
const path = require('path');

function newNote(body, notesArray) {
    const notes = body;
    notesArray.push(notes);
    fs.writeFileSync(path.join(__dirname, '../data/db.json'),
    JSON.stringify({ notes: notesArray }, null, 2))

    return notes;
}

function validateNote(note) {
    if(!note.title || typeof note.title !== 'string') {
        return false;
    }
    if(!note.text || typeof note.text !== 'string'){
        return false;
    }
    return true;
}

module.exports = { newNote, validateNote };