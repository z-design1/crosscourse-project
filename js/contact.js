const form = document.querySelector("#form");
const fullName = document.querySelector("#fullName");
const subject = document.querySelector("#subject");
const email = document.querySelector("#email");
const address = document.querySelector("#address");
const btn = document.querySelector(".btn");
const fullNameError = document.querySelector("#fullNameError");
const subjectError = document.querySelector("#subjectError");
const addressError = document.querySelector("#addressError");
const success = document.querySelector("#success");

form.addEventListener("submit", submitForm);
function submitForm(e) {
  e.preventDefault();
  fullNameError.innerHTML = "";
  subjectError.innerHTML = "";
  emailError.innerHTML = "";
  success.innerHTML = "";
  const fullNameValue = fullName.value.trim();
  const subjectValue = subject.value.trim();
  const emailValue = email.value.trim();
  console.log(fullName.value);
  if (fullName.value === "" || fullName.value === null) {
    fullNameError.innerHTML = "Name cannot be empty";
    allErrors.style.display = "block";
  }
  if (subjectValue.length < 15) {
    subjectError.innerHTML = "Subject must be at least 15 characters";
    allErrors.style.display = "block";
  }
  const checkEmail = validateEmail(emailValue);
  if (emailValue === "" || emailValue === null) {
    emailError.innerHTML = "Email address cannot be empty";
    allErrors.style.display = "block";
  }
  if (!checkEmail) {
    emailError.innerHTML = "Email address is not valid";
    allErrors.style.display = "block";
  }
  else {
    success.innerHTML = "Information sent";
    allErrors.style.display = "none";
    ClearAllFields();
    SuccessInfo();
  }
}
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
function ToggleActive(e) {
  if (document.querySelector("#navList a.active") !== null) {
    document.querySelector("#navList a.active").classList.remove("active");
  }
  e.target.className = "active";
}