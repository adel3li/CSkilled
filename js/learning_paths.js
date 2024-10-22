document.addEventListener('DOMContentLoaded', function() {
  loadLearningPaths();
});

function loadLearningPaths() {
  fetch('/json/learning_paths.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('learningPathsContainer');

      data.paths.forEach(path => {
        // Create anchor element to wrap the card
        const pathLink = document.createElement('a');
        
        // Use the link field from the JSON to assign the correct href value
        pathLink.href = path.link;  // Use the existing link field from the JSON
        pathLink.classList.add('learning-path-link');  // Add class for link styling

        // Create the card
        const pathElement = document.createElement('div');
        pathElement.classList.add('learning-path-card');  // Add class for card styling

        // Icon
        const icon = document.createElement('img');
        icon.src = path.icon;
        icon.alt = `${path.title} Icon`;
        icon.classList.add('learning-path-icon');  // Add class for icon styling
        pathElement.appendChild(icon);

        // Content Wrapper
        const contentWrapper = document.createElement('div');
        contentWrapper.classList.add('learning-path-card-content');
        
        // Path Title
        const pathTitle = document.createElement('h3');
        pathTitle.textContent = path.title;
        contentWrapper.appendChild(pathTitle);

        // Course Info
        const courseInfo = document.createElement('div');
        courseInfo.classList.add('course-info');
        courseInfo.textContent = `${path.courseInfo.courses} دورات | ${path.courseInfo.projects} مشاريع`;
        contentWrapper.appendChild(courseInfo);

        // Path Description
        const description = document.createElement('p');
        description.textContent = path.description;
        contentWrapper.appendChild(description);

        // Append content wrapper to the card
        pathElement.appendChild(contentWrapper);

        // Append the card inside the anchor element
        pathLink.appendChild(pathElement);

        // Append the anchor (with the card inside) to the container
        container.appendChild(pathLink);
      });
    })
    .catch(error => console.error('Error loading learning paths:', error));
}

// FAQ Toggle Script
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const answer = button.nextElementSibling;
    answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
  });
});