// navbar.js

// Get current user from localStorage
let currentUser = JSON.parse(localStorage.getItem('currentUser'));
const navLinks = document.getElementById('nav-links');

// Remove existing login link if any
const loginLink = navLinks.querySelector('a[href="login.html"]');
if(loginLink) loginLink.remove();

if(currentUser){
    // If logged in, show Profile & Sign Out
    const profileLink = document.createElement('a');
    profileLink.href = 'profile.html';
    profileLink.innerText = 'Profile';
    navLinks.appendChild(profileLink);

const signOutLink = document.createElement('a');
signOutLink.href = "#"; // no navigation
signOutLink.innerText = "Sign Out";
signOutLink.style.marginLeft = "10px"; // optional spacing
signOutLink.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    alert("Signed out!");
    window.location.reload(); // reload to show login again
});
navLinks.appendChild(signOutLink);


} else {
    // If not logged in, show Login
    const loginAnchor = document.createElement('a');
    loginAnchor.href = 'login.html';
    loginAnchor.innerText = 'Login';
    navLinks.appendChild(loginAnchor);
}
