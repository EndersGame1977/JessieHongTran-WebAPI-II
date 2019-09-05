const express = require('express');
const port = 5000;
const server = express();
const db = require('./data/db')
// const find = require('./data/db')

server.listen(port, ()=> {
    console.log(`server listening on port ${port}`);
})

server.use(express.json());


server.get('/', (req, res) => {
    console.log('HERE req',req)
    console.log('HERE res', res)
    res.status(200).json({api: 'up...'})
})

server.get('/api/posts', (req, res) => {
    db.find().then(posts => {
        if (posts) {
            res.status(200).json(posts)
        } else {
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        }
    })
        
})
// server.post("/api/posts", (req, res) => {
//     if(!req.body.title || !req.body.contents){
//         res.status(400).json({error: "Please provide title and contents for the post."})
//     } else {

//     }
