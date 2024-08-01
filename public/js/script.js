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
  const posts = await fetch("http://localhost:3000/blogs");
  const allPostData = await posts.json();
  allData = allPostData;
  displayBlogs();
}

function displayBlogs() {
  let blogData ='';
  allData.forEach((post) => {
    blogData += `<li><span><a href="/viewblog/${post._id}">${post.title}</a></span><span class="edit-dlt">
                 <a href="/viewblog/${post._id}"><button class="view-btn update-btn">
                 <i class="fa-solid fa-eye"></i>
                 </button></a></span></li>`;
  });
  totalBlog.innerHTML = blogData;
}

// <% posts.forEach(post=> { %>
//   <li><span><a href="/viewblog/<%=post._id%>">

//               <%=post.title %>

//           </a></span><span class="edit-dlt">
//           <a href="/viewblog/<%=post._id%>"><button class="view-btn update-btn">
//                   <i class="fa-solid fa-eye"></i>
//               </button></a></span></li>

//   <% }) %>

// <% if (nextPage !==null) { %>
//   <a href="/viewblogs/?page=<%= nextPage %>" class="pagination">View Older Posts &gt;</a>
//   <% } %>
// <% if (page >= 2) { %>
//   <a href="/viewblogs/?page=<%= (page - 1) %>" class="pagination">Back &lt;</a>
// <% } %>







// <% posts.forEach(post=> { %>
//   <li class="post-lists"><a href="/viewblog/<%=post._id%>">
//           <span>
//               <%=post.title %>
//           </span>
//       </a> <span class="edit-dlt">
//           <a href="/viewblog/<%=post._id%>"><button class="view-btn update-btn">
//                   <i class="fa-solid fa-eye"></i>
//               </button></a>
//           <a href="#"><button class="edit-btn update-btn"
//                   onclick="viewEditPost('<%=post.title%>','<%=post.body%>','<%=post._id%>')">
//                   <i class="fa-solid fa-pen-to-square"></i>
//               </button></a>
//           <a href="#"><button class="delete-btn update-btn" onclick="viewDeletePost('<%=post._id%>')">
//                   <i class="fa-solid fa-trash"></i>
//               </button></a>
//       </span></li>
//   <% }) %>

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

// //Edit user post
// let postId;
// function viewEditPost(title, body, id) {
//   addPostButton.style.display = "none";
//   editPostButton.style.display = "block";
//   blogHead.innerHTML = "Edit Blog";
//   addBlog.style.display = "block";
//   overlay.style.display = "block";
//   postTitle.value = title;
//   postContent.value = body;
//   postId = id;
// }

// async function editPost() {
//   try {
//     const id = postId;
//     let edittedData = readFormData();
//     const submitEdittedData = await fetch(
//       "http://localhost:3000/userblog/" + id,
//       {
//         method: "PUT",
//         headers: {
//           "Content-type": "application/json",
//         },
//         body: JSON.stringify(edittedData),
//       }
//     );
//     const response = await submitEdittedData.json();
//     const index = allData.findIndex((element) => element._id === id);
//     allData[index].title = response.title;
//     allData[index].body = response.body;
//     console.log(allData);
//   } catch (err) {
//     console.log("Error", err.message);
//   }
// }

// //Delete Post
// let deletePostId;
// function viewDeletePost(id) {
//   deletePostId = id;
//   deletePostContainer.style.display = "block";
//   overlay.style.display = "block";
// }

// async function deletePost() {
//   try {
//     const deletedPost = readFormData();
//     await fetch("http://localhost:3000/userblog/" + deletePostId, {
//       method: "DELETE",
//       headers: {
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify(deletedPost),
//     });

//     allData.filter((element, index) => {
//       if (element.id === deletePostId) {
//         allData.splice(index, 1);
//       }
//     });
//     console.log("Success:");
//   } catch (err) {
//     console.log("Error", err.message);
//   }
// }

//go to back

function goBack() {
  window.history.back();
}
