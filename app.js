const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");

const homeStartingContent = "Hey there! Welcome to the blog.";
const aboutContent = "Hi! I am Aakanksha Singhal, writing blogs just for fun! Check it out and let me know! ";
const contactContent = "I am available at aakankshasinghal1@gmail.com";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://admin-aakanksha:test123@cluster1.f8m6e.mongodb.net/blogDB", {useNewUrlParser: true});
const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res) {
  Post.find({}, function(err, posts) {
    res.render("home", {
      startingContent: homeStartingContent, //key-value pair with diff name
      posts: posts //key-value pair with same name
    });
  }); 
});

app.get("/about", function(req, res) {
  res.render("about", {abContent: aboutContent})
});

app.get("/contact", function(req, res) {
  res.render("contact", {conContent: contactContent})
});

app.get("/compose", function(req, res) {
  res.render("compose")
});

app.post("/compose", function(req, res) {
  const post = new Post ({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save(function(err){

    if (!err){
 
      res.redirect("/");
 
    }
 
  });
});

app.get("/posts/:postId", function(req, res) {
  const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

let port=process.env.PORT;
if (port== null||port==""){
  port=3000;
}
app.listen(port, function(){
  console.log("Server has started successfully");
});