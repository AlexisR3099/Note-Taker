// middleware function
const router = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

router.get('/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if(err) throw err;
        res.json(JSON.parse(data));
    });
});

router.post('/notes', (req,res) => {
    const newNote = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text
    };

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if(err) throw err;
        const notes = JSON.parse(data);
        notes.push(newNote);
        fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
            if (err) throw err;
        });
    });
    res.json(newNote);
});

router.delete('/notes/:id', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if(err) throw err;
        const notes = JSON.parse(data);
        const iD = (element) => element.id === req.params.id;
        const idIndex = notes.findIndex(iD);
        notes.splice(idIndex, 1);

        fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
            if (err) throw err;
        });

        res.json(notes);
    });
});

module.exports = router;