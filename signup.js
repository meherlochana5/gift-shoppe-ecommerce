const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  let users = JSON.parse(localStorage.getItem('users')) || [];

  if(users.find(u => u.email === email)){
    alert('Email already registered!');
    return;
  }

  users.push({ username, email, password });
  localStorage.setItem('users', JSON.stringify(users));
  alert('Signup successful! Please login.');
  window.location.href = 'login.html';
});
