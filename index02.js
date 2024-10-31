import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import bodyParser from "body-parser";
import axios from "axios"; 
import 'dotenv/config';
import FormData from "form-data"; 
import fetch from "node-fetch";



const app=express();
const port=3000;
var password="";
var username="";
const __dirname=dirname(fileURLToPath(import.meta.url));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

const upload = multer({ storage: multer.memoryStorage() });

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

app.post("/upload", upload.single("file"), async (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }

    try {
        // Prepare the form data using req.file.buffer
        const formData = new FormData();
        console.log("Server endpoint:", process.env.server);
        formData.append("file", req.file.buffer, {
            filename: req.file.originalname,
            contentType: req.file.mimetype,
        });

        // Use fetch instead of axios
        const response = await fetch(process.env.server, {
            method: "POST",
            body: formData,
            headers: formData.getHeaders(),
        });

        if (!response.ok) {
            throw new Error(`Failed to upload: ${response.statusText}`);
        }

        const responseData = await response.json();

        // Send the FastAPI server's response back to the client
        res.json(responseData);
    } catch (error) {
        console.error("Error uploading to FastAPI:", error.message);
        res.status(500).send("Error processing the file.");
    }
});




app.listen(port,()=>{
    console.log(`the server is listening at port ${port}`);
});

