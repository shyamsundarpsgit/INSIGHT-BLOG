// Prevent a resubmit on refresh and back button
if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}

let blogList = document.getElementById("blog-list");
let postTitle = document.getElementById("title");
let postContent = document.getElementById("content");
let overlay = document.getElementById("overlay");
let editPostButton = document.getElementById("edit-post-btn");
let addBlog = document.getElementById("add-edit-container");
let blogHead = document.getElementById("blog-head");
let editForm = document.getElementById("add-edit-form");
let deletePostContainer = document.getElementById("delete-post-container");

//Read form data
function readFormData() {
  let formData = {};
  formData["title"] = postTitle.value;
  formData["body"] = postContent.value;
  return formData;
}

//Close Form
function closeForm() {
  editForm.reset();
  addBlog.style.display = "none";
  overlay.style.display = "none";
  deletePostContainer.style.display = "none";
}

let allPost;
fetchAllPost();
async function fetchAllPost() {
  const fetchedData = await fetch("http://localhost:3000/admin/getpost");
  allPost = await fetchedData.json();
  displayBlog();
}

function displayBlog() {
  let postData = "";
  allPost.map((post) => {
    postData += ` <li><span><a href="/admin/viewpost/${post._id}" class="blog-content">${post.title}</a></span><span class="edit-dlt"><a href="/admin/viewpost/${post._id}">
  <button class="view-btn update-btn">
  <i class="fa-solid fa-eye"></i>
  </button></a>
   <a href="#"><button class="edit-btn update-btn" onclick="viewAdminEditPost('${post.title}','${post.body}','${post._id}')">
                <i class="fa-solid fa-pen-to-square"></i>
  </button></a>
  <a href="#"><button class="delete-btn update-btn" onclick="viewAdminDeletePost('${post._id}')">
                <i class="fa-solid fa-trash"></i>
                </button></a>
  </span></li>`;
  });
  blogList.innerHTML = postData;
}

//Edit posts
let postId;
function viewAdminEditPost(title, body, id) {
  editPostButton.style.display = "block";
  addBlog.style.display = "block";
  overlay.style.display = "block";
  postTitle.value = title;
  postContent.value = body;
  postId = id;
}

async function editPost() {
  try {
    let edittedData = readFormData();
    const id = postId;
    const response = await fetch("http://localhost:3000/admin/post/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(edittedData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    let index = allPost.findIndex((post) => post._id === id);
    if (index === -1) {
      console.log("Element not found");
    } else {
      allPost[index].title = edittedData.title;
      allPost[index].body = edittedData.body;
      displayBlog();
      console.log("Post updated successfully:");
    }
  } catch (err) {
    console.log("Error", err.message);
  }
}

//Delete post
let deleteId;

function viewAdminDeletePost(id) {
  deleteId = id;
  deletePostContainer.style.display = "block";
  overlay.style.display = "block";
}
async function deletePost() {
  try {
    const id = deleteId;
    let deleteData = readFormData();
    let response = await fetch("http://localhost:3000/admin/post/" + id, {
      method: "DELETE",
      headers: {
        "Content-type": "applicaiton/json",
      },
      body: JSON.stringify(deleteData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    allPost.forEach((post, index) => {
      if (post._id === id) {
        allPost.splice(index, 1);
      }
    });
    displayBlog();
    console.log("Success");
  } catch (err) {
    console.log("Error", err.message);
  }
}

//go to back

function goBack() {
  window.history.back();
}
