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
    db
    .find()
    .then(posts => {
        if (posts) {
            res.status(200).json(posts)
        } else {
            res.status(500).json({ errorMessage: "Please provide title and contents for the post." })
        }
    })
        
})

server.get('/api/posts/:id', (req, res) => {
    db
    .findById(req.params.id)
    .then(posts => 
        { if (!req.params.id){
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else if (!posts){
            res.status(500).json({ error: "The post information could not be retrieved." })
        }
        else {
            res.status(200).json(posts)
        } 
    })
})

server.get('/api/posts/:id/comments', (req, res) => {
    db
    .findPostComments(req.params.id)
    .then(comments => 
        { if (!req.params.id){
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else if (!comments){
            res.status(500).json({ error: "The comments information could not be retrieved." })
        }
        else {
            res.status(200).json(comments)
        } 
    })
})

let postId = 10
server.post('/api/posts', (req, res) => {
    const post = req.body;
    post.id = postId++;
    db
    .find()
    .then(posts => 
        {posts.push(post)
        res.status(201).json(posts)})
    
})


// server.post("/api/posts", (req, res) => {
//     if(!req.body.title || !req.body.contents){
//         res.status(400).json({error: "Please provide title and contents for the post."})
//     } else {

//     }
