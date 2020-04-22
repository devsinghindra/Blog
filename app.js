const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/" + "blogDB", { useNewUrlParser: true, useUnifiedTopology: true });

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Post = new mongoose.model("Post", blogSchema);

app.get("/", function (req, res) {
  Post.find({}, function (err, foundPosts) {
    if (err) {
      console.log(err);
    } else {
      res.render("home", {
        homeStartingContentH: homeStartingContent,
        posts: foundPosts
      });
    }
  });
});

app.get("/about", function (req, res) {
  res.render("about", {
    aboutContentH: aboutContent
  });
});

app.get("/contact", function (req, res) {
  res.render("contact", {
    contactContentH: contactContent
  });
});

app.get("/compose", function (req, res) {
  res.render("compose");
})

app.post("/compose", function (req, res) {
  const newPost = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });
  newPost.save(function (err) {
    if (!err) {
      res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function (req, res) {
  // console.log(req.params.postName);
  // const pName = req.params.postName;
  const postID = req.params.postId;
  // posts.forEach(function (post) {
  //   let postNameLower = _.lowerCase(pName);
  //   let postLower = _.lowerCase(post.title);
  //   if (postNameLower == postLower) {
  //     console.log("Match Found!");
  //     res.render("post", {
  //       post: post
  //     });
  //     // break;
  //   }
  //   else {
  //     console.log("No Match Found");
  //   }
  // });
  Post.findOne({ _id: postID }, function (err, foundPost) {
    if (err) {
      console.log(err);
      console.log("no match found");
    } else {
      res.render("post", {
        post: foundPost
      });
    }
  })
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});



//////some features to be added later
//authentication
//add online database
//deploy to heroku
//add compose button
//change some styling
//add about yourself