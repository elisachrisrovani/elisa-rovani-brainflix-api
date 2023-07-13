const express = require('express');
const router = express.Router();
const fs = require('fs');


router.get('/', (req, res) =>{
    fs.readFile('./data/videos.json', 'utf-8', (err, data) =>{
        if(err){
            console.log(err);
            return res.send("error reading videos");
        }
        res.json(JSON.parse(data));
    });
});

router.get('/:id', (req, res) =>{
    fs.readFile('./data/videos.json', 'utf-8', (err, data) =>{
        if (err){
            return res.send('error getting game with the id of ' + req.params.id);
        }

        const videos = JSON.parse(data);
        const findVideo = videos.find((video) => video.id == req.params.id);

        res.json(findVideo);
    });
});

router.post('/', (req, res) =>{
    console.log(req.body);

    fs.readFile('./data/videos.json', 'utf-8', (err, data) =>{
        if (err){
            return res.send('error reading game data file');
        }
        const videos = JSON.parse(data);

        const newVideo ={
            "id": String (uuid()),
            "title": req.body.title,
            "channel": "Peace green",
            "image": 'images/image0.jpeg',
            "description": req.body.description,
            "views": "1",
            "likes": "1",
            "duration": "2:20",
            "video": "https://project-2-api.herokuapp.com/stream",
            "timestamp": new Date(),
            "comments":[]
        };

        videos.push(newVideo);

        fs.writeFile('./data/videos.json',  JSON.stringify(videos), (err) =>{
            if(err){
                return res.send('error saving new video');
            }
            res.send('video uploaded')
        });
    });
});

module.exports = router;