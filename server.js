
require("dotenv").config();
const express = require('express');
const port = process.env.PORT || 5000;
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
    .then(post => 
        { if (!req.params.id){
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else if (!post){
            res.status(500).json({ error: "The post information could not be retrieved." })
        }
        else {
            res.status(200).json(post)
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

let commentId = 9
server.post('/api/posts/:id/comments', (req, res) => {
    const comment = req.body;
    // comment.id = commentId++;
    db
    .findCommentById(req.params.id)
    .then(posts => {
        posts.push(comment)
        res.status(201).json(comments)
    }
        
    )
})

server.delete('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    db
    .find()
    .then(posts => 
    {const filteredPosts = posts.filter(m => m.id !== Number(id));
    res.status(200).json(filteredPosts)
    })
  });

server.put('/api/posts/:id', (req, res) => {
    const editedPost = req.body;
    db
    .findById(req.params.id)
    .then(post => 
        res.status(200).json(editedPost)
        )
})
  


// server.post("/api/posts", (req, res) => {
//     if(!req.body.title || !req.body.contents){
//         res.status(400).json({error: "Please provide title and contents for the post."})
//     } else {

//     }
