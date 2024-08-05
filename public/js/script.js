// Prevent a resubmit on refresh and back button
if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}

let postTitle = document.getElementById("title");
let postContent = document.getElementById("content");
let overlay = document.getElementById("overlay");
let addPostButton = document.getElementById("add-post-btn");
let editPostButton = document.getElementById("edit-post-btn");
let addBlog = document.getElementById("add-edit-container");
let blogHead = document.getElementById("blog-head");
let addEditForm = document.getElementById("add-edit-form");
let deletePostContainer = document.getElementById("delete-post-container");
let totalBlog = document.getElementById('total-blogs');
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
  const response = await fetch("http://localhost:3000/blogs");
  const allPostData = await response.json();
  console.log(allPostData);
  allData = allPostData;
  displayBlogs();
}

function displayBlogs() {
  let blogData ='';
  allData.forEach((post) => {
    blogData +=`<li><span><a href="/viewblog/${post._id}" class="blog-content">${post.title}</a></span><span class="edit-dlt">
                 <a href="/viewblog/${post._id}"><button class="view-btn update-btn">
                 <i class="fa-solid fa-eye"></i>
                 </button></a></span></li>`;
  });
  totalBlog.innerHTML = blogData;
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
  deletePostContainer.style.display = "none";
}

//Create Post
async function createPost() {
 try{
  const data = readFormData();
  const response = await fetch("/addblog", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const newBlog = await response.json()
  allData.push(newBlog);
  console.log(allData);
  displayBlogs();
 }catch(err){
  console.log("Error",err.message);
 }
}

//go to back

function goBack() {
  window.history.back();
}
