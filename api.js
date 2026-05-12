import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 4000;
let posts = [
    {
        id  : 1,
        title : "The Quiet Power of Small Habits",
        content: "Success doesn’t always come from big, dramatic changes. More often, it grows quietly through small, consistent habits. Drinking enough water, reading a few pages daily, or coding just 30 minutes every day can slowly transform your life.These habits may feel insignificant at first, but over time, they build discipline and confidence. The key is consistency, not perfection. Missing one day doesn’t matter—giving up does.Start small. Stay consistent. Watch yourself become someone you once admired.",
        author : "Ayesha Noor",
        date: "2026-4-12"
    },
    {
        id : 2,
        title: "Why Learning to Code Feels So Hard (At First)",
        content: "Every beginner thinks coding is impossible at some point. The errors don’t make sense, logic feels confusing, and nothing works the first time. But that’s actually part of the process.Coding isn’t about memorizing syntax—it’s about training your brain to think differently. Each bug you fix and each problem you solve builds that skill slowly.So if it feels hard, you’re not failing—you’re learning exactly how you’re supposed to.",
        author: "Daniyal Raza",
        date : "21-8-2025"
    },
    {
        id : 3,
        title: "Confidence Isn’t Loud",
        content: "Many people think confidence means being loud and outgoing. But true confidence is quiet. It shows in how you carry yourself, how you speak, and how you handle challenges.You don’t need to prove anything to anyone. Confidence comes from knowing your worth, even when no one is watching.Sometimes, the calmest person in the room is the strongest.",
        author: "Ali Hamza",
        date : "2-4-2026"
    }
];
let lastID = 3;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.get("/posts" , (req,res)=>{
    console.log(posts);
    res.json(posts);
});
app.get("/posts/:id" , (req,res)=>{
    const post = posts.find((p)=> p.id === parseInt(req.params.id));
    if(!post){ 
        return res.status(404).json({message: "Post can't found"})
    };
    res.json(post);
});
app.post("/posts/new" , (req,res)=>{
    let newID = lastID +=1;
    let newPost = {
        id : newID,
        title : req.body.title,
        content : req.body.content,
        author : req.body.author,
        date:   new Date().toISOString().split("T")[0]
    }
    posts.push(newPost);
    lastID = newID;
    res.json(newPost);
    console.log(newPost);
});
app.patch("/posts/edit/:id" , (req,res)=>{
    const updatedPost = posts.find((p)=> p.id === parseInt(req.params.id));
    if(!updatedPost) {
        return res.status(404).json({message: "Post can't be found"})
    };
    if(req.body.title) updatedPost.title = req.body.title;
    if(req.body.content) updatedPost.content = req.body.content;
    if(req.body.author) updatedPost.author = req.body.author;
    res.json(updatedPost);
});
app.delete("/posts/:id" , (req,res)=>{
    const index = posts.findIndex((p)=> p.id === parseInt(req.params.id));
    if(index === -1) {
       return res.status(404).json({message: "Post can't be found"})
    };
    posts.splice(index , 1);
    res.json({message: "Post is deleted"});
})
app.listen(port , ()=>{
    console.log(`Server is running on port http://localhost:${port}`);
})