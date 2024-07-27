// Prevent a resubmit on refresh and back button
if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}

AOS.init();

let userDetails = document.getElementById("user-details");

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
    <li><a class="dropdown-item" href="#">View</a></li>
    <li><a class="dropdown-item" href="#">Edit</a></li>
    <li><a class="dropdown-item" href="#">Delete</a></li>
  </ul>
</div></td>
     </tr>`;
  });
  userDetails.innerHTML = tableData;
}
