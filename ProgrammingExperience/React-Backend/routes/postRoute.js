const express = require("express");
const post_route = express();

const bodyParser = require("body-parser");
post_route.use(bodyParser.json());
post_route.use(bodyParser.urlencoded({ extended: true }));

const multer = require("multer");
const path = require("path");

post_route.use(express.static("public"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      path.join(__dirname, "../public/postImages"),
      function (error, success) {
        if (error) {
          console.log("error", error);
        }
      }
    );
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name, function (error, success) {
      if (error) {
        console.log("error", error);
      }
    });
  },
});

const upload = multer({ storage: storage });

const postController = require("../controllers/postControllers");

post_route.post("/create-post", upload.single("image"), postController.createPost);
post_route.get("/get-posts", postController.getPosts);
post_route.get('/delete-posts/:id',postController.deletePosts);
post_route.post('/update-posts', upload.single("image"),postController.updatePosts);


module.exports = post_route;
