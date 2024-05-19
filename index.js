const regForm = document.getElementById("registration");
const username = regForm.elements["username"];
const email = regForm.elements["email"];
const password = regForm.elements["password"];
const passwordCheck = regForm.elements["passwordCheck"];
const terms = regForm.elements["terms"];
const errorDisplay = document.getElementById("errorDisplay");
errorDisplay.style.display = "block";
errorDisplay.textContent = "hello";

// clear display and disable
function displayClear() {
  errorDisplay.textContent = "";
  errorDisplay.style.display = "none";
}

//Registration Form - Username Validation
function valUsername() {
  let usernameVal = username.value;
  //The username cannot be blank.
  if (usernameVal === "") {
    
    errorDisplay.textContent = "The username cannot be blank.";
    username.focus();
    return false;
  }
  displayClear();
  //The username must be at least four characters long.
  if (usernameVal.length < 4) {
    errorDisplay.textContent = "the user name has to be at least 4 characters";
    username.focus();
    return false;
  }
  displayClear();
  // The username must contain at least two unique characters.
  // The Set object in JavaScript automatically removes duplicate characters, so if the size of the set is less than 2, it means there are not enough unique characters.
  if (new Set(usernameVal.toLowerCase()).size < 2) {
    errorDisplay.textContent =
      "The username must contain at least two unique characters";
    username.focus();
    return false;
  }
  displayClear();
  // The username cannot contain any special characters or whitespace
  const specialChars = ["@", "!", "#", "$", "%", " "];
if (specialChars.some(char => usernameVal.includes(char))) {
  errorDisplay.textContent += "The username cannot contain any special characters or whitespace";
  username.focus();
  return false;
}
  displayClear();
  return usernameVal;
}

// Registration Form - Email Validation:
function valEmail() {
  //The email must be a valid email address.
  let emailVal = email.value;

  if (emailVal === "") {
    errorDisplay.textContent = "Please provide an email.";
    email.focus();
    return false;
  }
  displayClear();

  // The email must be a valid email address.
  const regex = /\S+@\S+\.\S+/
  if (!regex.test(emailVal)) {
    errorDisplay.textContent += "Invalid email address.";
    email.focus();
    return false;
  }
  displayClear();

  const atpos = emailVal.indexOf("@");
  const dotpos = emailVal.lastIndexOf(".");

  if (atpos < 1) {
    // alert("Your email must include an @ symbol which must not be at the beginning of the email.");
    errorDisplay.textContent =
      "Your email must include an @ symbol which must not be at the beginning of the email.";
    email.focus();
    return false;
  }
  displayClear();

  if (dotpos - atpos < 2) {
    errorDisplay.textContent =
      "Invalid structure: @.\nYou must include a domain name after the @ symbol.";
    email.focus();
    return false;
  }
  displayClear();

  // The email must not be from the domain "example.com"
  const domain = window.location.host;
  if (emailVal.contains(domain)) {
    errorDisplay.textContent = "The email must not be from the domain";
    email.focus();
    return false;
  }

  return emailVal;
}
displayClear();
// Registration Form - Password Validation:
function valPassword() {
  let valPassword = password.value;
  let valPasswordCheck = passwordCheck.value;

  // Passwords must be at least 12 characters long.
  if (valPassword.length != 12) {
    errorDisplay.textContent = "Passwords must be at least 12 characters long";
    password.focus();
    return false;
  }
  displayClear();

  // Passwords must have at least one uppercase and one lowercase letter
  charCountUpper = 0;
  charCountLower = 0;
  valPassword.forEach((char) => {
    if (char >= "A" && char <= "Z") {  // if (!/[a-z]/.test(passwordVal) || !/[A-Z]/.test(passwordVal))
      charCountUpper++;
    }
  });

  valPassword.forEach((char) => {
    if (char >= "a" && char <= "z") {
      charCountLower++;
    }
  });
  if (charCountUpper < 1 && charCountLower < 1) {
    errorDisplay.textContent =
      "Passwords must have at least one uppercase and one lowercase letter";
    password.focus();
    return false;
  }
  displayClear();

  // Passwords must contain at least one number.
  const num = /[0-9]/; //  /\d/
  if (!num.test(valPassword)) {
    errorDisplay.textContent = "Passwords must contain at least one number";
    password.focus();
    return false;
  }
  displayClear();

  // Passwords must contain at least one special character
//   const specialChar = ["@", "!", "#", "$", "%", " "];
//   const speChar = false;

//   for (let i = 0; i < valPassword.length; i++) {
//     for (let j = 0; j < specialChar.lenght; j++) {
//       if (valPassword[i].includes(specialChar[j])) {
//         speChar = true;
//       } else {
//         errorDisplay.textContent =
//           "Passwords must contain at least one special character";
//         password.focus();
//         return false;
//       }
//     }
//   }

if (!/[^a-zA-Z\d\s]/.test(passwordVal)) {
    errorDisplay.textContent += "Password must contain at least one special character";
    password.focus();
    return false;
  }
  displayClear();

  // Passwords cannot contain the word "password" (uppercase, lowercase, or mixed).
  let regex = /password/;
  if (regex.test(valPassword)) {
    errorDisplay.textContent =
      "The password cannot contain the word 'password'.";
    password.focus();
    return false;
  }
  displayClear();

  // Passwords cannot contain the username.
  let valUsername = username.val;
  if (valPassword.contains(valUsername)) {
    errorDisplay.textContent = "Passwords cannot contain the username.";
    password.focus();
    return false;
  }
  displayClear();

  // Both passwords must match.
  if (valPassword !== valPasswordCheck) {
    errorDisplay.textContent = "Both passwords must match";
    passwordCheck.focus();
    return false;
  }
  displayClear();
  return valPassword;
}

// Registration Form - Terms and Conditions
function valTerms() {
  // The terms and conditions must be accepted.
  if (!terms.checked) {
    errorDisplay.textContent = "The terms and conditions must be accepted";
    return false;
  }
  displayClear();
  return terms.checked;
}



// If all validation is successful, store the username, email, and password using localStorage
regForm.addEventListener("submit", function (e) {
  e.preventDefault();

  if (valUsername() && valEmail() && valPassword() && valTerms()) {
   
    //create users array or get stored users
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the username already exists
    if (users.some((user) => user.username === username.value.trim().toLowerCase())) {
      errorDisplay.textContent =
        "Username already exists. Please choose another one.";
    } else {
      // Create a new user object
       // Valid usernames and email should be converted to all lowercase before being stored
      let newUser = {
        username: username.value.trim().toLowerCase(),
        email: email.value.trim().toLowerCase(),
        password: password.value.trim()
      };

      // Add the new user to the array
      users.push(newUser);

      // Store the updated users array in localStorage
      localStorage.setItem("users", JSON.stringify(users));

      // Clear all form fi elds after successful submission and show a success message
      username.value = "";
      email.value = "";
      password.value = "";
      passwordCheck.value = "";
    }
}
//    else {
//     errorDisplay.textContent = "Please fill out all fields.";
//   }
});
displayClear();

// Login Form Validation Requirements
const loginForm = document.getElementById("login");
const usernameLogin = loginForm.elements["username"];
const passwordLogin = loginForm.elements["password"];
const keepLogincheck = loginForm.elements["persist"];
// Login Form - Username Validation
function loginUsrVal() {
  const username = usernameLogin.value;
  // The username cannot be blank.
  if (username === "") {
    errorDisplay.textContent = "enter user name";
    usernameLogin.focus();
    return false;
  }
  displayClear();

  // The username must exist (within localStorage ).
  // Remember that usernames are stored in all lowercase,
  // but the username field accepts (and should not invalidate) mixed-case input.
  let users = JSON.parse(localStorage.getItem("users"));
  if (users.some((user) => user.username !== username.toLowerCase())) {
    errorDisplay.textContent = "username does not exist";
    usernameLogin.focus();
    return false;
  }
  displayClear();

  return username;
}

// Login Form - Password Validation
function loginPassword() {
  const password = loginPassword.value;
  // The password cannot be blank.
  if ([password] === "") {
    errorDisplay.textContent = "The password cannot be blank";
    passwordLogin.focus();
    return false;
  }
  displayClear();

  // The password must be correct (validate against localStorage)
  if (!users.some((user) => user.password === password.toLowerCase())) {
    errorDisplay.textContent = "The password must be correct";
    passwordLogin.focus();
    return false;
  }
  displayClear();
  return password;
}



loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  if (loginUsrVal() && loginPassword()) {
    // If "Keep me logged in" is checked, modify the success message to indicate this (normally, this would be handled by a variety of persistent login tools and technologies).
    if (keepLogincheck.checked) {
      errorDisplay.textContent =
        "normally, this would be handled by a variety of persistent login tools and technologies";
    }

    // If all validation is successful, clear all form fi elds and show a success message.
    errorDisplay.textContent = "successfully loggedin";
    usernameLogin.value = "";
    passwordLogin.value = "";
  } else {
    errorDisplay.textContent = "Invalid username or password.";
  }
  displayClear();
});
