// Get current logged-in user
let currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser) {
  alert('Please login first!');
  window.location.href = 'login.html';
}

// Display username
document.getElementById('username-display').innerText = currentUser.username;
document.getElementById('username').innerText = currentUser.username;

// Sign out button
document.getElementById('signout-btn').addEventListener('click', () => {
  localStorage.removeItem('currentUser');
  alert('Signed out!');
  window.location.href = 'login.html';
});

// Elements
const ordersGrid = document.getElementById('orders-grid');
const totalAmountEl = document.getElementById('total-amount');
const placedOrdersGrid = document.getElementById('placed-orders-grid');

// Load user's cart orders
let userOrders = currentUser.orders || [];

// Display cart items
function displayOrders() {
  ordersGrid.innerHTML = '';
  let totalAmount = 0;

  if (userOrders.length === 0) {
    ordersGrid.innerHTML = "<p>No items in cart!</p>";
  } else {
    userOrders.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'order-card';
      div.innerHTML = `
        <img src="${item.img}" alt="${item.title}">
        <h4>${item.title}</h4>
        <p>₹${item.price}</p>
        <button class="remove-btn">Cancel Order</button>
      `;
      ordersGrid.appendChild(div);

      const price = Number(item.price.toString().replace(/[^0-9.]/g, ''));
      totalAmount += price;

      // Cancel order button for cart items
      div.querySelector('.remove-btn').addEventListener('click', () => {
        userOrders.splice(index, 1);
        currentUser.orders = userOrders;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        let users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.email === currentUser.email);
        if (userIndex !== -1) {
          users[userIndex].orders = userOrders;
          localStorage.setItem('users', JSON.stringify(users));
        }

        displayOrders();
      });
    });
  }

  totalAmountEl.innerText = totalAmount;
}

// Display placed orders
function displayPlacedOrders() {
  let placedOrders = JSON.parse(localStorage.getItem('placedOrders')) || [];
  placedOrdersGrid.innerHTML = '';

  if (placedOrders.length === 0) {
    placedOrdersGrid.innerHTML = "<p>No orders placed yet!</p>";
  } else {
    placedOrders.forEach((order, index) => {
      const div = document.createElement('div');
      div.className = 'order-card';
      div.innerHTML = `
        <img src="${order.img}" alt="${order.title}">
        <h4>${order.title}</h4>
        <p>₹${order.price}</p>
        <p>Address: ${order.address}</p>
        <p>Phone: ${order.phone}</p>
        <p>Payment: ${order.paymentMethod}</p>
        <p>Order Date: ${order.date}</p>
        <button class="cancel-placed-btn">Cancel Order</button>
      `;
      placedOrdersGrid.appendChild(div);

      // Cancel order button for placed orders
      div.querySelector('.cancel-placed-btn').addEventListener('click', () => {
        placedOrders.splice(index, 1);
        localStorage.setItem('placedOrders', JSON.stringify(placedOrders));
        displayPlacedOrders();
      });
    });
  }
}

// Initial render
displayOrders();
displayPlacedOrders();

// Buy Now button - go to checkout
document.getElementById('buy-now').addEventListener('click', () => {
  if (userOrders.length === 0) {
    alert('No items in cart!');
    return;
  }

  // Save current cart items for checkout
  localStorage.setItem('checkoutItems', JSON.stringify(userOrders));

  // Redirect to checkout page
  window.location.href = 'checkout.html';
});
