const express=require('express');
const app=express();
const port=3000;
const jwt=require('jsonwebtoken');
app.use(express.json());
const secretKey="bc94c78b4eec39a68b2c17d1d1d01bbc";
let users=[
    {"id":1,"name":"Agalya"},
    {"id":2,"name":"Ashifa"},
    {"id":3,"name":"Banu"},  
];


//api to get all users
app.get('/users',(req,res)=>{
    res.status(200).json(users);
});



//api to insert a users
app.post('/insertuser',(req,res)=>{
    {
        id:req.body.id;
        name:req.body.name;
    }
    users.push(newUser);
    res.status(201).json({"message":"user inserted successfully",users});
});

//fileter based on id
app.get("/user/:id",(req,res)=>{
    const urlID=Number(req.params.id);
    const filteredUser=users.find((u)=>u.id===urlID);
    res.status(200).json(filteredUser);
    if (!urlID){
        res.status(404).json({"message":"user not found"});
    }
    else{
        res.status(500).json({"message":"internal server error"});
    }
    res.status(200).json("found user with id:",filteredUser.id,filteredUser.name );
});


//delete based on id
app.delete("/deleteuser/:id",(req,res)=>{
    const urlID=Number(req.params.id);

    users=users.filter((u)=>u.id!==urlID);
    if(!urlID){
    res.status(500).json({"message":"internal server error"});
    }res.status(200).json({"message":"deleted successfully",users});
});


app.get('/login',(req,res)=>{
    const claims={
        id:100,
        name:"admin",
        role:"admin"
    };
    const token=jwt.sign(claims,secretKey,{expiresIn:'50s'});
    //jwt.sign(claims,secretKey,{exp:'5s'})
    console.log(token);
    res.status(200).json({token:token});
});

 

app.get('/profile',(req,res)=>{
    const token=req.headers("authorization");
    const verified=jwt.verify(token,secretKey);

    if(verified instanceof TokenExpiredError){
        res.status(401).json({"message":"token expired"});
    }
    else if(verified){
        res.status(200).json({"message":"invalid credentials"});
    }  
    res.status(200).json({"message":"valid credentials"}); 
});






app.listen(port,()=>{
    console.log(`server is running at port http://localhost:${port}`);
});