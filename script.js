// Handle tab switching
document.querySelectorAll('.tab-button').forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    button.classList.add('active');
    
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => content.classList.add('hidden'));
    
    // Show the clicked tab content
    const targetContent = button.id.replace('Tab', 'Content');
    document.getElementById(targetContent).classList.remove('hidden');
  });
});

// Curriculum
document.addEventListener('DOMContentLoaded', function() {
  fetch('curriculum.json')
    .then(response => response.json())
    .then(data => {
      const container = document.querySelector('.curriculum-section');

      data.forEach(section => {
        const detailsElement = document.createElement('details');
        
        const summaryElement = document.createElement('summary');
        summaryElement.innerHTML = `
          <span class="module-title">${section.title}</span>
          <span class="toggle-icon">+</span>
        `;
        
        const lessonList = document.createElement('ul');
        lessonList.classList.add('lesson-list');
        section.lessons.forEach(lesson => {
          const listItem = document.createElement('li');

          // Create the lesson content
          let lessonContent = `
          <span class="lesson-icon">${getLessonIcon(lesson.type)}</span>
            <span class="lesson-name">${lesson.name}</span>
          `;

          // Check if the lesson has a link and wrap it with an anchor tag if true
          if (lesson.link) {
            lessonContent = `
              <a href="#" class="lesson-link" data-link="${lesson.link}">
                ${lessonContent}
              </a>
            `;
          }

          listItem.innerHTML = lessonContent;
          lessonList.appendChild(listItem);

          // Add a container for the video iframe, initially hidden
          const videoContainer = document.createElement('div');
          videoContainer.classList.add('video-container');
          videoContainer.style.display = 'none'; // Hidden by default
          listItem.appendChild(videoContainer);
        });

        detailsElement.appendChild(summaryElement);
        detailsElement.appendChild(lessonList);
        container.appendChild(detailsElement);
      });

      // Add event listener for links to embed video below the lesson
      document.querySelectorAll('.lesson-link').forEach(link => {
        link.addEventListener('click', function(event) {
          event.preventDefault();
          const videoUrl = this.getAttribute('data-link');
          const videoContainer = this.closest('li').querySelector('.video-container');

          // Toggle video container visibility and embed the video
          if (videoContainer.style.display === 'none') {
            videoContainer.style.display = 'block';
            videoContainer.innerHTML = `
              <iframe width="100%" height="400" src="${embedVideoUrl(videoUrl)}" frameborder="0" allowfullscreen></iframe>
            `;
          } else {
            videoContainer.style.display = 'none';
            videoContainer.innerHTML = ''; // Clear iframe when hidden
          }
        });
      });

      document.querySelectorAll('.curriculum-section details').forEach(detail => {
        detail.addEventListener('toggle', function () {
          const icon = this.querySelector('.toggle-icon');
          icon.textContent = this.open ? '-' : '+';
        });
      });
    })
    .catch(error => console.error('Error loading curriculum:', error));
});

// Convert video URL to embeddable format for YouTube or Google Drive
function embedVideoUrl(url) {
  if (url.includes('youtube.com')) {
    const videoId = url.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}`;
  } else if (url.includes('drive.google.com')) {
    const fileId = url.match(/[-\w]{25,}/)[0];
    return `https://drive.google.com/file/d/${fileId}/preview`;
  } else {
    return url; // Return the original URL if it's not recognized
  }
}

function getLessonIcon(type) {
  switch (type) {
    case 'lecture':
      return '📖';
    case 'homework':
      return '📝';
    case 'challenge':
      return '⚔️';
    case 'project':
      return '🚀';
    default:
      return '🔍';
  }
}

// Function to fetch instructor section data from the JSON data file
async function fetchInstructorContent() {
  try {
      const response = await fetch('instructor.json');
      const data = await response.json();

      const instructor = data.instructor;
      const instructorSection = document.querySelector('.instructor');
      instructorSection.innerHTML = `
          <img src="${instructor.image}" alt="${instructor.name}" class="circular-image">
          <div>
              <h3>${instructor.name}</h3>
              ${instructor.description.map(desc => `<p>${desc}</p>`).join('')}
          </div>
      `;

      // Populate the FAQ section
      const faqSection = document.querySelector('.faq-content');
      faqSection.innerHTML = data.faq.map(faq => `
          <details>
              <summary>${faq.question}</summary>
              <p>${faq.answer}</p>
          </details>
      `).join('');

  } catch (error) {
      console.error('Error fetching the content:', error);
  }
}

// Call the function to fetch and display content
fetchInstructorContent();

// Reviews
document.addEventListener('DOMContentLoaded', function() {
  fetch('reviews.json')
      .then(response => response.json())
      .then(data => {
          const container = document.getElementById('reviewsContent');
          data.forEach(review => {
              const reviewElement = document.createElement('div');
              reviewElement.className = 'review';

              const initials = review.name.split(' ').map(word => word[0]).join('').substring(0, 2);

              const photo = review.photo 
                  ? `<img src="${review.photo}" alt="student photo" class="student-photo">` 
                  : `<div class="student-photo">${initials}</div>`;

              const isEnglish = review.language === 'en';

              reviewElement.innerHTML = `
                  ${photo}
                  <div class="review-details">
                      <div class="review-header">
                          <div>
                              <span class="student-name">${review.name}</span>
                              <span class="student-title">${review.title}</span>
                          </div>
                          <div class="star-rating">
                              <span>${review.rating}</span>
                          </div>
                      </div>
                      <div class="review-text ${isEnglish ? 'english' : 'arabic'}">
                          <p data-full-text="${review.text}">${review.text.replace(/\n/g, '<br>')}</p> 
                          ${review.expandable && review.text.length > 100 ? '<button class="see-more">See less</button>' : ''}
                      </div>
                  </div>
              `;
              container.appendChild(reviewElement);
          });

          document.querySelectorAll('.review').forEach(review => {
              const reviewText = review.querySelector('.review-text');
              const textElement = reviewText.querySelector('p');
              const fullText = textElement.dataset.fullText;
              const seeMoreButton = reviewText.querySelector('.see-more');
              let isExpanded = true;

              if (seeMoreButton) {
                  seeMoreButton.addEventListener('click', function() {
                      if (isExpanded) {
                          textElement.innerHTML = fullText.substring(0, 100).replace(/\n/g, '<br>') + '...'; 
                          seeMoreButton.textContent = 'See more';
                      } else {
                          textElement.innerHTML = fullText.replace(/\n/g, '<br>'); 
                          seeMoreButton.textContent = 'See less';
                      }
                      isExpanded = !isExpanded;
                  });
              }
          });
      })
      .catch(error => console.error('Error loading reviews:', error));
});

// Fetch FAQ data from the JSON file
fetch('faq.json')
  .then(response => response.json())
  .then(data => {
    const faqList = document.getElementById('faqList');
    
    // Loop through each FAQ and create the HTML structure
    data.faq.forEach(item => {
      // Create the <details> element
      const details = document.createElement('details');
      
      // Create the <summary> element for the question
      const summary = document.createElement('summary');
      summary.textContent = item.question;
      
      // Create the <p> element for the answer
      const answer = document.createElement('p');
      answer.textContent = item.answer;
      
      // Append the summary and answer to the details element
      details.appendChild(summary);
      details.appendChild(answer);
      
      // Append the details element to the FAQ list in the HTML
      faqList.appendChild(details);
    });
  })
  .catch(error => console.error('Error loading FAQ:', error));
