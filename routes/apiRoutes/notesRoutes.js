const fs = require('fs');
const router = require('express').Router();
const path = require('path');
const { notes } = require('../../data/db');

router.get('/notes', (req, res) => {
    let results = fs.readFileSync(path.join(__dirname, '../../data/db.json'));
    var data = JSON.parse(results);
    if(req.query) {
        res.status(200).json(data.notes);
    } else {
        res.sendStatus(404)
    }
});



module.exports = router;