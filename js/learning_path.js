document.addEventListener('DOMContentLoaded', function() {
  loadLearningPath();
});

// Function to load the learning path information from a JSON file
function loadLearningPath() {
  fetch('json/learning_path.json') // Ensure the correct path for your JSON file
      .then(response => response.json())
      .then(data => {
          // Set the path title and description
          document.getElementById('pathTitle').textContent = data.title;
          document.getElementById('pathDescription').textContent = data.description;

          // Load the modules into the modules container
          const modulesContainer = document.getElementById('modulesContainer');
          modulesContainer.innerHTML = ''; // Clear any existing content

          data.modules.forEach(module => {
              // Create the module card
              const moduleElement = document.createElement('div');
              moduleElement.classList.add('module');

              // Module title and description
              const moduleTitle = document.createElement('h3');
              moduleTitle.textContent = module.title;

              const moduleDescription = document.createElement('p');
              moduleDescription.textContent = module.description;

              // Link to explore the module
              const moduleLink = document.createElement('a');
              moduleLink.href = module.link; // Assuming each module has a "link" property
              moduleLink.textContent = 'عرض الدورة';
              moduleLink.classList.add('module-link');

              // Append elements to the module card
              moduleElement.appendChild(moduleTitle);
              moduleElement.appendChild(moduleDescription);
              moduleElement.appendChild(moduleLink);

              // Append the module card to the container
              modulesContainer.appendChild(moduleElement);
          });
      })
      .catch(error => console.error('Error loading learning path:', error));
}