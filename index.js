import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.get("/" , async (req,res)=>{
    try{
        const response = await axios.get(API_URL+ "/posts");
        res.render("index.ejs" , {posts : response.data});
    }catch(error){
        res.send(error);
    }
});
app.get("/posts/new" , (req,res)=>{
    res.render("modify.ejs" , {post: null})
})
app.post("/posts/new" , async (req,res)=>{
    try{
        const response = await axios.post(API_URL + "/posts/new" , req.body);
        res.redirect("/");
    }catch(error){
        res.send(error);
    }
})
app.get("/posts/edit/:id" , async (req,res)=>{
    try{
        const response = await axios.get(API_URL + "/posts/" + req.params.id);
        res.render("modify.ejs" , {post: response.data});
    }catch(error){
        res.send(error);
    }
})
app.post("/posts/edit/:id" , async (req,res)=>{
    try{
        const response = await axios.patch(API_URL + "/posts/edit/" + req.params.id , req.body);
        res.redirect("/");
    }catch(error){
        res.send(error);
    }
})
app.post("/posts/:id" , async (req,res)=>{
    try{
       const response = await axios.delete(API_URL + "/posts/" + req.params.id);
       res.redirect("/");
    }catch(error){
        res.send(error);
    }
})
app.listen(port , ()=>{
    console.log(`Server is running on port ${port}`);
})