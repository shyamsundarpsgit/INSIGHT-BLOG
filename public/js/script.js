// Prevent a resubmit on refresh and back button
if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}

AOS.init(); //aos animation

let postTitle = document.getElementById("title");
let postContent = document.getElementById("content");
let overlay = document.getElementById("overlay");
let addPostButton = document.getElementById("add-post-btn");
let editPostButton = document.getElementById("edit-post-btn");
let addBlog = document.getElementById("add-edit-container");
let blogHead = document.getElementById("blog-head");
let addEditForm = document.getElementById("add-edit-form");

//set overlay
overlay.style.display = "none";

//function to read form data
function readFormData() {
  let formData = {};
  formData["title"] = postTitle.value;
  formData["body"] = postContent.value;
  return formData;
}

//get all data
let allData;
getAllData();
async function getAllData() {
  const posts = await fetch("http://localhost:3000/viewallblogs");
  const allPostData = await posts.json();
  allData = allPostData;
}

//add blog
function addPost() {
  addPostButton.style.display = "block";
  editPostButton.style.display = "none";
  blogHead.innerHTML = "Add Blog";
  addBlog.style.display = "block";
  overlay.style.display = "block";
  addEditForm.reset();
}

//Close Form
function closeForm() {
  blogHead.innerHTML = "Add Blog";
  addEditForm.reset();
  addBlog.style.display = "none";
  overlay.style.display = "none";
}

//Create Post
async function createPost() {
  const data = readFormData();
  const newPost = await fetch("/addblog", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  allData.push(newData);
  const newData = await newPost.json();
}

//Edit user post
let postId;
function viewEditPost(title, body, id) {
  addPostButton.style.display = "none";
  editPostButton.style.display = "block";
  blogHead.innerHTML = "Edit Blog";
  addBlog.style.display = "block";
  overlay.style.display = "block";
  postTitle.value = title;
  postContent.value = body;
  postId = id;
}

async function editPost() {
  try {
    const id = postId;
    let edittedData = readFormData();
    const submitEdittedData = await fetch(
      "http://localhost:3000/userblog/" + id,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(edittedData),
      }
    );
    await submitEdittedData.json();
  } catch (err) {
    console.log("Error", err.message);
  }
}


//Delete Post
