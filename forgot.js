const emailForm = document.getElementById('email-form');
const otpForm = document.getElementById('otp-form');
const resetForm = document.getElementById('reset-form');

let generatedOTP;
let resetEmail;

emailForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  let users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.email === email);

  if(user){
    resetEmail = email;
    generatedOTP = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    localStorage.setItem('otp', generatedOTP);
    alert(`OTP sent to your email (for demo, OTP is ${generatedOTP})`);
    emailForm.style.display = 'none';
    otpForm.style.display = 'block';
  } else {
    alert('Email not found!');
  }
});

otpForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const otpInput = document.getElementById('otp').value.trim();
  const storedOTP = localStorage.getItem('otp');

  if(otpInput === storedOTP){
    otpForm.style.display = 'none';
    resetForm.style.display = 'block';
  } else {
    alert('Incorrect OTP!');
  }
});

resetForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newPassword = document.getElementById('new-password').value.trim();
  let users = JSON.parse(localStorage.getItem('users')) || [];
  users = users.map(u => u.email === resetEmail ? {...u, password: newPassword} : u);
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.removeItem('otp');
  alert('Password reset successful! Please login.');
  window.location.href = 'login.html';
});
