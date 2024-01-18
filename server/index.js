
const express = require("express");
const app = express();
const port = 3000;
var jwt = require("jsonwebtoken");
const {auth} = require("./middleware"); //curly braces means extracting only auth property from middleware file
const JWT_SECRET = "secret";
let USERS_ID_COUNTER = 1;
const SUBMISSION = [];
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
var urlencodedParser = bodyParser.urlencoded({extended: true});
const cors = require("cors");
app.use(cors({credentials:true, origin:"http://localhost:5173"}));
 app.use(jsonParser);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const {generateFile} = require('./generateFile');
const {executeCpp} = require('./executeCpp')
const {executePy} = require('./executePy')
const mongoose = require('mongoose')
const User = require('./models/User')

async function connectTodb(){
    console.log("inside mongo");
    try{
        await mongoose.connect('mongodb+srv://tempodummy12:nVwmLeLSbrAZMJCg@cluster0.mczg2he.mongodb.net/?retryWrites=true');
        console.log("connected to mongodb");
    }catch(error){
        console.log("error connecting to mongodb", error);
    }
}

connectTodb();


const PROBLEMS = [
    {
        problemID: "1",
        tittle: "203. Happy Number",
        difficulty: "Medium",
        acceptance: "58%",
        description: "Write a program to determine if a number n is happy",
        exampleIn: "n = 18",
        exampleOut: "true"
    },
    {
        problemID: "2",
        tittle: "202. Happy Number",
        difficulty: "Easy",
        acceptance: "58%",
        description: "Write a program to determine if a number n is happy",
        exampleIn: "n = 18",
        exampleOut: "true"
    },
    {
        problemID: "3",
        tittle: "205. Happy Number",
        difficulty: "Easy",
        acceptance: "58%",
        description: "Write a program to determine if a number n is happy",
        exampleIn: "n = 18",
        exampleOut: "true"
    },
    {
        problemID: "4",
        tittle: "205. Happy Number",
        difficulty: "Easy",
        acceptance: "58%",
        description: "Write a program to determine if a number n is happy",
        exampleIn: "n = 18",
        exampleOut: "true"
    },
    {
        problemID: "5",
        tittle: "206. Happy Number",
        difficulty: "Easy",
        acceptance: "58%",
        description: "Write a program to determine if a number n is happy",
        exampleIn: "n = 18",
        exampleOut: "true"
    },
    {
        problemID: "6",
        tittle: "207. Happy Number",
        difficulty: "Easy",
        acceptance: "58%",
        description: "Write a program to determine if a number n is happy",
        exampleIn: "n = 18",
        exampleOut: "true"
    },
    {
        problemID: "7",
        tittle: "209. Happy Number",
        difficulty: "Easy",
        acceptance: "58%",
        description: "Write a program to determine if a number n is happy",
        exampleIn: "n = 18",
        exampleOut: "true"
    },
    
];
app.get('/', (req, res)=>{
    res.json({
        mssg: "hello World"
    })
})

app.get('/me', auth, (req, res)=>{
    try{
        const user = USERS.find((x)=> x.id === req.userId);
        res.json({user});
    }catch(err){
        return null;
    }

});

app.get('/problems', (req, res)=>{
    const filteredProblems = PROBLEMS.map(x => ({
        problemID: x.problemID,
        difficulty: x.difficulty,
        acceptance: x.acceptance,
        tittle: x.tittle,
    }))
    res.json({
        problems: filteredProblems
    })
})

app.get('/problems/:id', (req, res)=>{
    const id = req.params.id;
    const problem = PROBLEMS.find(x=> x.problemID == id);
    if(!problem){
        res.status(411).json({});
    }
    res.json({
       problem
    })
})

app.post('/signup', async (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const userDoc = await User.create({
        username: username,
        password: bcrypt.hashSync(password, salt),
    });

    
    res.status(201).json(userDoc);
});

app.post('/login', async( req, res)=>{
    const{username, password} = req.body;

    //jwt are way to create token to store a information 
    // to generate it we call sign() which takes payload and secretkey as input 
    //payload is typically an object containing the data we want to store in token 
    // const payload = {
    //     id: user.id
    // }
    const userDoc = await User.findOne({username});
    const passok = bcrypt.compareSync(password, userDoc.password );
    console.log("passok");
    if(passok){
        jwt.sign({username, id: userDoc._id}, JWT_SECRET, {}, (err, token)=>{
            if(err)throw err;
            res.cookie('token', token). json({
                id:userDoc._id,
                username,
            })
        })
    }else{
        res.json("wrong credentials try again")
    }
});

app.get('/submission/:problemID', auth , (req, res)=>{
    const problemid = req.params.problemID;
    const submission = SUBMISSION.find(x => x.problemid == problemid && x.userId == req.userId);
    res.json({
        submission,
    })
})

app.post('/submission/', auth , (req, res)=>{
    const isCorrect = Math.random() < 0.5;
    const submission = req.body.submission;
    const problemid = req.body.problemID;

    if(isCorrect){
        SUBMISSION.push({
            submission,
            problemid,
            userId: req.userId,
            status: 'AC',
        })

        return res.json({
            status:"AC"
        })
    }else{
        SUBMISSION.push({
            submission,
            problemid,
            userId: req.userId,
            status: "WA"
        })
        
        return res.json({
            status:"WA"
        })
    }
})


app.post("/run", async (req, res)=>{
    const {language, code} = req.body;
    //console.log(language);
    if(code === undefined){
        res.status(400).json({success:"false", error:"empty code body"});
    }

    //generate the file
    try{
    const filePath = await generateFile(language, code);
    let output;
    if(language == "py"){
        output = await executePy(filePath);
    }else{
        output = await executeCpp(filePath);
    }
    res.json({ filePath , output});
    }catch(err){
        res.status(500).json({err});
    }
    
})

app.get('/profile', (req, res)=>{
    const {token} = req.cookies;
    jwt.verify(token, secretKey, {}, (err, info)=>{
        if(err)throw err;
        res.json(info);
    });
})


app.post('/logout', (req, res)=>{
    res.cookie('token', '').json("OK");
})


app.listen(port, ()=>{
    console.log("hello")
    console.log(`Server listening in port ${port}`);
})
