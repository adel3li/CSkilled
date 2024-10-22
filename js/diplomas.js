document.addEventListener('DOMContentLoaded', function() {
  loadDiplomas();
});

// Function to load diplomas from a JSON file
function loadDiplomas() {
  fetch('/data/diplomas.json') // Ensure the correct path for your JSON file
      .then(response => response.json())
      .then(data => {
          const container = document.getElementById('diplomasContainer');
          container.innerHTML = ''; // Clear any existing content

          data.diplomas.forEach(diploma => {
              // Create the diploma card
              const diplomaElement = document.createElement('div');
              diplomaElement.classList.add('diploma');

              // Diploma title and description
              const diplomaTitle = document.createElement('h3');
              diplomaTitle.textContent = diploma.title;

              const diplomaDescription = document.createElement('p');
              diplomaDescription.textContent = diploma.description;

              // Link to explore the diploma
              const diplomaLink = document.createElement('a');
              diplomaLink.href = diploma.link; // Assuming each diploma has a "link" property
              diplomaLink.textContent = 'عرض الدبلومة';
              diplomaLink.classList.add('diploma-link');

              // Append elements to the diploma card
              diplomaElement.appendChild(diplomaTitle);
              diplomaElement.appendChild(diplomaDescription);
              diplomaElement.appendChild(diplomaLink);

              // Append the diploma card to the container
              container.appendChild(diplomaElement);
          });
      })
      .catch(error => console.error('Error loading diplomas:', error));
}