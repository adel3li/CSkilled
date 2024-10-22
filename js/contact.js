document.addEventListener('DOMContentLoaded', function () {
  loadContactInfo();
});

// Function to load contact data from the JSON file
function loadContactInfo() {
  fetch('/json/contact.json') // Correct path to the JSON file
      .then(response => response.json())
      .then(data => {
          const contact = data.contact;

          // Populate the contact details
          document.getElementById('contactEmail').textContent = contact.details.email;
          document.getElementById('contactPhone').textContent = contact.details.phone;
          document.getElementById('contactAddress').textContent = contact.details.address;

          // Populate the social media links
          document.getElementById('facebookLink').href = contact.social.facebook;
          document.getElementById('linkedinLink').href = contact.social.linkedin;
          document.getElementById('youtubeLink').href = contact.social.youtube;
      })
      .catch(error => console.error('Error loading contact information:', error));
}