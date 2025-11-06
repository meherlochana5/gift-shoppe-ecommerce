const likedContainer = document.getElementById('liked-products');
let liked = JSON.parse(localStorage.getItem('liked')) || [];

if(liked.length === 0){
  likedContainer.innerHTML = "<p>No liked products yet.</p>";
} else {
  liked.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.innerHTML = `
      <img src="${product.img}" alt="${product.title}">
      <div class="product-details">
        <h3>${product.title}</h3>
        <p class="price">${product.price}</p>
        <button class="add-btn">Add to Cart</button>
        <button class="remove-btn">Remove</button>
      </div>
    `;
    likedContainer.appendChild(card);

    card.querySelector('.add-btn').addEventListener('click', () => {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      if (!cart.find(p => p.title === product.title)) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.title} added to cart!`);
      } else {
        alert(`${product.title} already in cart!`);
      }
    });

    card.querySelector('.remove-btn').addEventListener('click', () => {
      liked = liked.filter(p => p.title !== product.title);
      localStorage.setItem('liked', JSON.stringify(liked));
      card.remove();
    });
  });
}
