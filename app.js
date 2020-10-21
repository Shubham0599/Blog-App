var express=require("express"),
    mongoose=require("mongoose"),
    bodyParser=require("body-parser");
    
    var app=express();

    //app config
    mongoose.connect("mongodb://localhost:27017/blog_app",{useNewUrlParser:true,useUnifiedTopology:true});
    app.use(express.static("public"));
    app.set("view engine","ejs");
    app.use(bodyParser.urlencoded({extended:true}));
//mongoosse /model cofiguration
    var blogSchema=new mongoose.Schema({
        title:String, 
        image:String,
        body:String,
        created:{type:Date,default:Date.now}
    });
    var Blog=mongoose.model("Blog",blogSchema); 

    // Blog.create({
    //     title:"My First Shoot 🎥",
    //     image:"https://images.unsplash.com/photo-1603032034989-908052b687f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    //     body:"This is the first Shoot which was to be done in the mid of summer but...",
        
    // },function(err,bod){
    //     if(err)console.log(err);
    //     else console.log(bod);
    // });

    //restful routes
    app.get("/",(req,res)=>{
        res.redirect("/blogs");
    });
    app.get("/blogs",(req,res)=>{
        Blog.find({},(err,blog)=>{
            if(err)console.log(err)
            else res.render("index",{data:blog})
        })
    })
//form page
    app.get("/blogs/new",(req,res)=>{
        res.render("new");
    });
    //form page execute or creating
    app.post("/blogs",(req,res)=>{
        Blog.create(req.body.blog,(err,blog)=>{
            if(err)res.render("new");
            else res.redirect("/blogs");
        })
    })
//show route
    app.get("/blogs/:id",(req,res)=>{
        var id=req.params.id;
        Blog.findById(id,(err,body)=>{
            if(err) res.redirect("/blogs");
            else res.render("show",{data:body});
        })
        // res.render("show")
    })

    app.listen('3000',function(err,run){
        if(err)console.log(err);
        else console.log("app is running");
    });