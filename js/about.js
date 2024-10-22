document.addEventListener('DOMContentLoaded', function () {
  loadAboutPage();
});

// Function to load about data from the JSON file
function loadAboutPage() {
  fetch('/json/about.json') // Updated path to the JSON file
      .then(response => response.json())
      .then(data => {
          const about = data.about;

          // Fill the Mission section
          const missionElement = document.getElementById('missionText');
          missionElement.textContent = about.mission;

          // Fill the History section
          const historyElement = document.getElementById('historyContainer');
          about.history.forEach(paragraph => {
              const historyParagraph = document.createElement('p');
              historyParagraph.textContent = paragraph;
              historyElement.appendChild(historyParagraph);
          });

          // Fill the Team/Founder section
          const founderName = document.getElementById('founderName');
          founderName.textContent = about.team.founder.name;

          const founderImage = document.getElementById('founderImage');
          founderImage.src = about.team.founder.image;
          founderImage.alt = `صورة ${about.team.founder.name}`;

          const founderBio = document.getElementById('founderBio');
          founderBio.textContent = about.team.founder.bio;
      })
      .catch(error => console.error('Error loading about page data:', error));
}