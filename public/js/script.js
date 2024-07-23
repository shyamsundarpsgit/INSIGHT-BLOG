// Prevent a resubmit on refresh and back button
if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}

AOS.init(); //aos animation

//set overlay
let overlay = document.getElementById("overlay");
overlay.style.display = "none";
let addPostButton = document.getElementById('addPost');
let editPostButton = document.getElementById('editPost');
//signup & login

//add blog
let addBlog = document.getElementById("add-edit-container");
let blogHead = document.getElementById("blog-head");

function addPost() {
  blogHead.innerHTML = "Add Blog";
  addBlog.style.display = "block";
  overlay.style.display = "block";
}

//Close Form
function closeForm() {
  blogHead.innerHTML = "Add Blog";
  addBlog.style.display = "none";
  overlay.style.display = "none";
}

//Edit user post
let  postTitle = document.getElementById('title');
let postContent = document.getElementById('content');

function editPost(title,body) {
  blogHead.innerHTML = "Edit Blog";
  addBlog.style.display = "block";
  overlay.style.display = "block";
  postTitle.value = title;
  postContent.value = body;
}
