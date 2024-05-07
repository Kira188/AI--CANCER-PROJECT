import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const app=express();
const port=3000;
var password="";
var username="";
const __dirname=dirname(fileURLToPath(import.meta.url));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/index01.html");
});

function confirmation(req,res,next){
    password=req.body["password"];
    console.log(password);
    next();
}
app.use(confirmation);

app.post("/check",(req,res)=>{
    if(password === "JSSSTU")
    {
        res.sendFile(__dirname+"/public/index02.html");
    }
    else
    {
        res.sendFile(__dirname+"/public/index03.html");
    }
});




app.listen(port,()=>{
    console.log(`the server is listening at port ${port}`);
});

