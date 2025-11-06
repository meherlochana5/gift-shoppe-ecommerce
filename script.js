document.addEventListener('DOMContentLoaded', () => {
  const products = document.querySelectorAll('.product-card');

  products.forEach(product => {
    const addBtn = product.querySelector('.add-btn');
    const likeBtn = product.querySelector('.like-btn');

    // Product data
    const prodInfo = {
      title: product.querySelector('h3').innerText,
      price: product.querySelector('.price').innerText,
      img: product.querySelector('img').src
    };

    // ----- Add to Cart -----
    addBtn.addEventListener('click', () => {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      // Check if product already in cart
      if (!cart.find(item => item.title === prodInfo.title)) {
        cart.push(prodInfo);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${prodInfo.title} added to cart!`);
      } else {
        alert(`${prodInfo.title} is already in cart!`);
      }
    });

    // ----- Like / Unlike -----
    likeBtn.addEventListener('click', () => {
      let liked = JSON.parse(localStorage.getItem('liked')) || [];
      const index = liked.findIndex(item => item.title === prodInfo.title);

      if (index === -1) {
        // Add to liked
        liked.push(prodInfo);
        likeBtn.style.background = '#e4646a'; // liked
      } else {
        // Remove from liked
        liked.splice(index, 1);
        likeBtn.style.background = '#ff9a9e'; // unliked
      }

      localStorage.setItem('liked', JSON.stringify(liked));
    });

    // ----- Initial state for Like button -----
    let liked = JSON.parse(localStorage.getItem('liked')) || [];
    if (liked.find(item => item.title === prodInfo.title)) {
      likeBtn.style.background = '#e4646a';
    }
  });
});
// Check if a user is logged in
let currentUser = JSON.parse(localStorage.getItem('currentUser'));
const navLinks = document.getElementById('nav-links');

// Remove existing login link if any
const loginLink = navLinks.querySelector('a[href="login.html"]');
if(loginLink) loginLink.remove();

if(currentUser){
    // If logged in, show Profile & Sign Out buttons
    const profileLink = document.createElement('a');
    profileLink.href = 'profile.html';
    profileLink.innerText = 'Profile';
    navLinks.appendChild(profileLink);

    const signOutBtn = document.createElement('button');
    signOutBtn.innerText = 'Sign Out';
    signOutBtn.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        alert('Signed out!');
        window.location.reload(); // reload to show login again
    });
    navLinks.appendChild(signOutBtn);

}else{
    // If not logged in, show Login button
    const loginAnchor = document.createElement('a');
    loginAnchor.href = 'login.html';
    loginAnchor.innerText = 'Login';
    navLinks.appendChild(loginAnchor);
}
