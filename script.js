document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  // Elements
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  // Reset states
  let isValid = true;
  document.querySelectorAll(".error-msg").forEach(msg => msg.style.display = "none");
  document.querySelectorAll("input, textarea").forEach(input => input.classList.remove("invalid"));

  // 1. Name Validation
  if (!nameInput.value.trim()) {
    showError(nameInput, "nameError");
    isValid = false;
  }

  // 2. Email Validation (Regex match)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
    showError(emailInput, "emailError");
    isValid = false;
  }

  // 3. Message Validation
  if (!messageInput.value.trim()) {
    showError(messageInput, "messageError");
    isValid = false;
  }

  // Stop if form validation fails
  if (!isValid) return;

  // 4. Save to LocalStorage securely
  const submissions = JSON.parse(localStorage.getItem("contacts")) || [];
  
  const newSubmission = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    message: messageInput.value.trim(),
    timestamp: new Date().toLocaleString() // Elegant bonus metric
  };

  submissions.push(newSubmission);
  localStorage.setItem("contacts", JSON.stringify(submissions));

  // Visual success feedback
  alert("✨ Message sent and saved successfully!");
  document.getElementById("contactForm").reset();
});

// Helper function to show UI errors smoothly
function showError(inputElement, errorId) {
  inputElement.classList.add("invalid");
  document.getElementById(errorId).style.display = "block";
}