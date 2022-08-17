// middleware function
const router = require('express').Router();
const { text } = require('express');
const fs = require('fs');
const { title } = require('process');
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

module.exports = router;