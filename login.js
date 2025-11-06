const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  // Get all registered users from localStorage
  let users = JSON.parse(localStorage.getItem('users')) || [];

  // Find user with matching email & password
  const user = users.find(u => u.email === email && u.password === password);

  if(user){
    // Save current logged-in user
    localStorage.setItem('currentUser', JSON.stringify({
      username: user.username,
      email: user.email
    }));

    alert('Login successful!');

    // Redirect to profile page instead of home
    window.location.href = 'profile.html';
  } else {
    alert('Invalid email or password!');
  }
});
