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
let userBlogs = document.getElementById("user-blog");
let viewPosts = document.getElementById('view-posts');
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
  displayBlogs();
}

function displayBlogs() {
  let blogData = "";
  allData.forEach((post) => {
    blogData += ` <li class="post-lists"><a href="/viewblog/${post._id}"><span>${post.title}</span></a>
     <span class="edit-dlt">
          <a href="/viewblog/${post._id}">
              <button class="view-btn update-btn">
                  <i class="fa-solid fa-eye"></i>
              </button>
          </a>
          <a href="#"><button class="edit-btn update-btn"
                  onclick="viewEditPost('${post.title}','${post.body}','${post._id}')">
                  <i class="fa-solid fa-pen-to-square"></i>
              </button></a>
          <a href="#"><button class="delete-btn update-btn" onclick="viewDeletePost('${post._id}')">
                  <i class="fa-solid fa-trash"></i>
              </button></a>
      </span></li>`;
  });
  userBlogs.innerHTML = blogData;
}



// <% if (nextPage !==null) { %>
//   <a href="/viewblogs/?page=<%= nextPage %>" class="pagination">View Older Posts &gt;</a>
//   <% } %>
// <% if (page >= 2) { %>
//   <a href="/viewblogs/?page=<%= (page - 1) %>" class="pagination">Back &lt;</a>
// <% } %>

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
  try {
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
    const newBlog = await response.json();
    allData.push(newBlog);
    console.log(allData);
    displayBlogs();
  } catch (err) {
    console.log("Error", err.message);
  }
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
    const response = await fetch(
      "http://localhost:3000/userblog/" + id,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(edittedData),
      }
    );
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    const submitEdittedData = await response.json();
    const index = allData.findIndex((element) => element._id === id);
    allData[index].title =submitEdittedData.title;
    allData[index].body = submitEdittedData.body;
    displayBlogs();
  } catch (err) {
    console.log("Error", err.message);
  }
}

//Delete Post
let deletePostId;
function viewDeletePost(id) {
  deletePostId = id;
  deletePostContainer.style.display = "block";
  overlay.style.display = "block";
}

async function deletePost() {
    const id = deletePostId;
  try {
    const deletedPost = readFormData();
     const response = await fetch("http://localhost:3000/userblog/" + id, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(deletedPost),
    });
    if(!response.ok){
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    allData.filter((element, index) => {
      if (element._id === id) {
        allData.splice(index, 1);
      }
    });
    displayBlogs();
    console.log("Success:");
  } catch (err) {
    console.log("Error", err.message);
  }
}

//go to back

function goBack() {
  window.history.back();
}
