document.addEventListener('DOMContentLoaded', function() {
  loadLearningPaths();
});

// Function to load learning paths from a JSON file
function loadLearningPaths() {
  fetch('/json/learning_paths.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('learningPathsContainer');
      
      data.paths.forEach(path => {
        const pathElement = document.createElement('div');
        pathElement.classList.add('learning-path');

        // Path Title and Toggle Button
        const pathTitle = document.createElement('h2');
        pathTitle.textContent = path.title;
        const toggleIcon = document.createElement('span');
        toggleIcon.classList.add('toggle-icon', 'collapsed');
        toggleIcon.addEventListener('click', function() {
          const details = pathElement.querySelector('.path-details');
          if (details.style.display === 'none' || details.style.display === '') {
            details.style.display = 'block';
            toggleIcon.classList.remove('collapsed');
            toggleIcon.classList.add('expanded');
          } else {
            details.style.display = 'none';
            toggleIcon.classList.remove('expanded');
            toggleIcon.classList.add('collapsed');
          }
        });

        pathTitle.appendChild(toggleIcon);
        pathElement.appendChild(pathTitle);
        
        // Path Description
        const description = document.createElement('p');
        description.textContent = path.description;
        pathElement.appendChild(description);

        // Path Details (Modules)
        const details = document.createElement('div');
        details.classList.add('path-details');
        path.modules.forEach(module => {
          const moduleTitle = document.createElement('h3');
          moduleTitle.textContent = module.title;
          details.appendChild(moduleTitle);
          
          const moduleDescription = document.createElement('p');
          moduleDescription.textContent = module.description;
          details.appendChild(moduleDescription);
        });
        
        pathElement.appendChild(details);
        container.appendChild(pathElement);
      });
    })
    .catch(error => console.error('Error loading learning paths:', error));
}