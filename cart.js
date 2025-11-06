const cartContainer = document.getElementById('cart-products');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to render cart
function renderCart() {
    cartContainer.innerHTML = ''; // clear container

    if(cart.length === 0){
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cart.forEach((product, index) => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
          <img src="${product.img}" alt="${product.title}">
          <div class="product-details">
            <h3>${product.title}</h3>
            <p class="price">₹${product.price}</p>
            <button class="remove-btn">Remove</button>
            <button class="order-btn">Order Now</button>
          </div>
        `;
        cartContainer.appendChild(card);

        // Remove from cart
        card.querySelector('.remove-btn').addEventListener('click', () => {
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        });

        // Order individual product
        card.querySelector('.order-btn').addEventListener('click', () => {
            let currentUser = JSON.parse(localStorage.getItem("currentUser"));
            if(!currentUser){
                alert("Please login first!");
                return;
            }

            let users = JSON.parse(localStorage.getItem("users")) || [];
            let userIndex = users.findIndex(u => u.email === currentUser.email);

            if(userIndex !== -1){
                users[userIndex].orders = users[userIndex].orders || [];
                // Add product to user's orders
                users[userIndex].orders.push(product);
                localStorage.setItem("users", JSON.stringify(users));

                currentUser.orders = users[userIndex].orders;
                localStorage.setItem("currentUser", JSON.stringify(currentUser));

                alert(`"${product.title}" added to Your Cart Items in Profile!`);

                // Remove from cart
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            }
        });
    });
}

// Initial render
renderCart();

// Buy All button - order all items at once
const buyAllButton = document.getElementById("buy-now-btn"); // If you have a "Buy All" button
if(buyAllButton){
    buyAllButton.addEventListener("click", () => {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if(!currentUser){
            alert("Please login first!");
            return;
        }

        if(cart.length === 0){
            alert("Your cart is empty!");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];
        let userIndex = users.findIndex(u => u.email === currentUser.email);

        if(userIndex !== -1){
            users[userIndex].orders = users[userIndex].orders || [];
            users[userIndex].orders.push(...cart); // add all cart items
            localStorage.setItem("users", JSON.stringify(users));

            currentUser.orders = users[userIndex].orders;
            localStorage.setItem("currentUser", JSON.stringify(currentUser));

            alert("All items in your cart have been added to Your Cart Items in Profile!");
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }
    });
}
