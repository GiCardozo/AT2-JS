document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById("registrationForm");
    const registerButton = document.getElementById("registerButton");
    const userTable = document.getElementById("userTable");
    const tableBody = userTable.querySelector("tbody");
  
    function renderTable(users) {
      tableBody.innerHTML = "";
      users.forEach(user => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${user.username}</td><td>${user.email}</td>`;
        tableBody.appendChild(row);
      });
    }
  
    function isPasswordValid(password) {
      return password.length === 8 && /\d{2,}/.test(password);
    }
  
    function isUsernameUnique(username, users) {
      return !users.some(user => user.username.toLowerCase() === username.toLowerCase());
    }
  
    function disableForm() {
      registrationForm.querySelectorAll("input").forEach(input => {
        input.disabled = true;
      });
      registerButton.textContent = "UNLOCKER";
    }
  
    function enableForm() {
      registrationForm.querySelectorAll("input").forEach(input => {
        input.disabled = false;
      });
      registerButton.textContent = "REGISTER";
    }
  
    registerButton.addEventListener("click", function () {
      if (registerButton.textContent === "UNLOCKER") {
        enableForm();
        sessionStorage.removeItem("locked"); // Remove o estado de bloqueio
      }
    });
  
    registrationForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const username = document.getElementById("username").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
  
      const users = JSON.parse(sessionStorage.getItem("users")) || [];
  
      if (!isUsernameUnique(username, users)) {
        alert("Username already exists. Please choose another");
        return;
      }
  
      if (!isPasswordValid(password)) {
        alert("Password must be 8 characters long and contain at least 2 numbers");
        return;
      }
  
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
  
      users.push({ username, email });
      sessionStorage.setItem("users", JSON.stringify(users));
  
      if (users.length >= 50) {
        disableForm();
        renderTable(users);
        sessionStorage.setItem("locked", "true"); 
        userTable.hidden = false;
      }
  
      registrationForm.reset();
    });
  
    const storedUsers = JSON.parse(sessionStorage.getItem("users")) || [];
    
    if (storedUsers.length >= 50 || sessionStorage.getItem("locked") === "true") {
      disableForm();
      renderTable(storedUsers);
      userTable.hidden = false;
    } else {
      enableForm();
      userTable.hidden = true;
    }
  });
  