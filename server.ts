import express from 'express'
let app  = express()




app.use(express.static("public"));

app.listen(1212,()=>{
    console.log(`server listening on http://localhost:1212`);})

