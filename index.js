const express = require('express');
const cors = require('cors');
const app = express()
const videoRoutes = require('./routes/videos');

app.use(cors());

app.use(express.json());

app.use(express.static('public'));

app.use('/videos', videoRoutes);

app.get('/', (req,res) =>{  
    res.send('<h1>Videos API</h1>')
});

app.listen(5050, () => {
    console.log('app running at http://localhost:5050');
});