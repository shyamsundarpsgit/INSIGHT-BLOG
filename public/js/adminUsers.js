// Prevent a resubmit on refresh and back button
if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}

let userDetails = document.getElementById("user-details");
let deletePostContainer = document.getElementById("delete-post-container");
let overlay = document.getElementById("overlay");
function closeForm() {
  overlay.style.display = "none";
  deletePostContainer.style.display = "none";
}

//GET USER
let allUsers;
getUser();
async function getUser() {
  let response = await fetch("http://localhost:3000/admin/getusers");
  let allUserData = await response.json();
  allUsers = allUserData;
  displayUsers();
}

let tableData = "";
function displayUsers() {
  allUsers.forEach((user, index) => {
    tableData += `<tr>
    <th scope="row">${index + 1}</th>
     <td>${user.name}</td>
     <td>${user.email}</td>
     <td><div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    <i class="fa-solid fa-ellipsis"></i>
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a class="dropdown-item" href="#" onclick="viewAdminDeleteUser('${user._id}')">Delete</a></li>
  </ul>
</div></td>
     </tr>`;
  });
  userDetails.innerHTML = tableData;
}


//Delete
function viewAdminDeletePost(id) {
  deleteId = id;
  deletePostContainer.style.display = "block";
  overlay.style.display = "block";
}

async function deleteUser(){
  const id = deleteId;
  const response = await fetch("/admin/user:id",
    {
      method:"DELETE",
      headers: {
        "Content-type": "applicaiton/json",
      },
      body: JSON.stringify(deleteData),
    }
  );
}