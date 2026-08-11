document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('applyForm');
  const statusMessage = document.getElementById('statusMessage');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    // Clear existing error states
    clearErrors();

    let isValid = true;

    // Fields
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const position = document.getElementById('position');
    const resume = document.getElementById('resume');

    // Name Validation
    if (!fullName.value.trim()) {
      showError(fullName, 'nameError', 'Full name is required.');
      isValid = false;
    }

    // Email Validation
    if (!email.value.trim()) {
      showError(email, 'emailError', 'Email address is required.');
      isValid = false;
    } else if (!validateEmail(email.value)) {
      showError(email, 'emailError', 'Please enter a valid email address.');
      isValid = false;
    }

    // Phone Validation
    if (!phone.value.trim()) {
      showError(phone, 'phoneError', 'Phone number is required.');
      isValid = false;
    }

    // Position Validation
    if (!position.value) {
      showError(position, 'positionError', 'Please select a position.');
      isValid = false;
    }

    // Resume Validation
    if (resume.files.length === 0) {
      showError(resume, 'resumeError', 'Please upload your resume.');
      isValid = false;
    }

    // If valid, simulate form submission
    if (isValid) {
      statusMessage.className = 'status-message success';
      statusMessage.textContent = 'Application submitted successfully!';
      form.reset();
    }
  });

  function showError(inputElement, errorId, message) {
    const parentGroup = inputElement.parentElement;
    const errorSpan = document.getElementById(errorId);
    parentGroup.classList.add('error');
    errorSpan.textContent = message;
  }

  function clearErrors() {
    const errorGroups = document.querySelectorAll('.form-group.error');
    errorGroups.forEach((group) => group.classList.remove('error'));
    
    const errorSpans = document.querySelectorAll('.error-message');
    errorSpans.forEach((span) => (span.textContent = ''));
    
    statusMessage.textContent = '';
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
});