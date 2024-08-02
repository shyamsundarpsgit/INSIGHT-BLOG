// Prevent a resubmit on refresh and back button
if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}

let userDetails = document.getElementById("user-details");
let deleteUserContainer = document.getElementById("delete-user-container");
let overlay = document.getElementById("overlay");
function closeForm() {
  overlay.style.display = "none";
  deleteUserContainer.style.display = "none";
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


function displayUsers() {
  let tableData = "";
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
function viewAdminDeleteUser(id) {
  deleteId = id;
  deleteUserContainer.style.display = "block";
  overlay.style.display = "block";
}

async function deleteUser(){
 try{
  const id = deleteId;
  const deleteData = allUsers.filter(ele=>ele._id===id);
  const response = await fetch("/admin/user/"+id,
    {
      method:"DELETE",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(deleteData),
    }
  );
  if(!response.ok){
    throw new Error(`HTTP Errror ${response.status}`);
  }
  allUsers.forEach((user, index) => {
    if (user._id === id) {
      allUsers.splice(index, 1);
    }
  });
  displayUsers();
 }catch(err){
   console.log(err.message);
 }
}