const express=require("express");
const app= express();
const port=8080;
const path=require("path");

const { v4: uuidv4 } = require('uuid');


app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts = [
    {
        id:uuidv4(),
        username:"ApnaCollege",
        content: "I LOVE CODING!"
    },
    {
        id:uuidv4(),
        username:"HUB ALI",
        content: "I LOVE CRICKET!"
    },
    {
        id:uuidv4(),
        username:"ABDUL AZIZ ",
        content: "Try is key to success!"
    }
]

app.get("/posts",(req,res)=>{
   res.render("index.ejs",{posts});
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
    console.log("Hello")
 })


 // Creating new post
 app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
 })

 app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post =posts.find((p)=> id === p.id); 
    res.render("show.ejs",{post});

 })
 
app.listen(port,()=>{
    console.log("Listening port : 8080");
})