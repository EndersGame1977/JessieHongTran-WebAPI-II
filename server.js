const express = require('express');
const port = 5000;
const server = express();

server.listen(port, ()=> {
    console.log(`server listening on port ${port}`);
})
server.post("/api/posts", (req, res) => {
    if(!req.body.title || !req.body.contents){
        res.status(400).send("Please provide title and contents for the post.")
    }
})