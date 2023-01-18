import express from 'express'
let app  = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.get("/",(req,res)=>{
//     res.end(`Hello`);
// })

app.use(express.static("public"));
app.listen(8080,()=>{
    console.log('up')
})