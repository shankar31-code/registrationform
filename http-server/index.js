
const http =require("http");
const fs = require("fs");
let homecontent="";
let projectcontent="";
let registercontent="";
fs.readFile("./home.html",(err,home)=>{
    if(err)
    {
        throw error;
    }
    homecontent=home;
});
fs.readFile("./project.html",(err,project)=>{
    if(err)
    {
        throw err;
    }
    projectcontent=project;
});
fs.readFile("./registration.html",(err,register)=>{
    if(err)
    {
        throw err;
    }
    registercontent=register;
});
http.createServer((req,res)=>{
    let url =req.url;
    res.writeHeader(200,{"content-Type":"text/html"});
    switch(url)
    {
        case "/project":
            res.write(projectcontent);
            res.end();
            break;
           case "/registration.html":
            res.write(registercontent);
            res.end();
            break;
            default:
                res.write(homecontent);
                res.end();
                break;
    }
}).listen(3000);
