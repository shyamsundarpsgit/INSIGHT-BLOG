// Prevent a resubmit on refresh and back button
if ( window.history.replaceState ) {
    window.history.replaceState( null, null, window.location.href );
}

AOS.init(); //aos animation

//set overlay 
let overlay = document.getElementById('overlay');
overlay.style.display = 'none';

//signup & login




//add blog
let addBlog = document.getElementById('add-blog-container');

function addPost(){
 addBlog.style.display='block';
 overlay.style.display='block';
}

//Close Form
function closeForm(){
addBlog.style.display = 'none';
overlay.style.display = 'none';
}