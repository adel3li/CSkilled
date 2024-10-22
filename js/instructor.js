document.addEventListener('DOMContentLoaded', function () {
  loadInstructor();
});

// Function to load instructor data from the JSON file
function loadInstructor() {
  fetch('/json/instructor.json') // Ensure this path is correct
      .then(response => response.json())
      .then(data => {
          const instructor = data.instructor;

          // Select the container to display the instructor's information
          const container = document.getElementById('instructorsContainer');
          container.innerHTML = ''; // Clear any existing content

          // Create elements for the instructor's information
          const instructorElement = document.createElement('div');
          instructorElement.classList.add('instructor-profile');

          // Instructor's image
          const instructorImage = document.createElement('img');
          instructorImage.src = instructor.image;
          instructorImage.alt = `صورة ${instructor.name}`;
          instructorImage.classList.add('instructor-image');

          // Instructor's name
          const instructorName = document.createElement('h3');
          instructorName.textContent = instructor.name;

          // Instructor's description
          const instructorDescription = document.createElement('div');
          instructorDescription.classList.add('instructor-description');

          // Loop through the description array and add each paragraph
          instructor.description.forEach(paragraph => {
              const descriptionParagraph = document.createElement('p');
              descriptionParagraph.innerHTML = paragraph; // Use innerHTML to allow for embedded HTML links
              instructorDescription.appendChild(descriptionParagraph);
          });

          // Append all elements to the instructor element
          instructorElement.appendChild(instructorImage);
          instructorElement.appendChild(instructorName);
          instructorElement.appendChild(instructorDescription);

          // Append the instructor element to the container
          container.appendChild(instructorElement);
      })
      .catch(error => console.error('Error loading instructor data:', error));
}