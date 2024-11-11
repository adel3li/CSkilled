// Specific JavaScript

// Handle tab switching
document.querySelectorAll('.tab-button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.remove('active');
      content.style.display = 'none';
    });
    
    const targetContent = button.id.replace('Tab', 'Content');
    const targetElement = document.getElementById(targetContent);
    targetElement.classList.add('active');
    targetElement.style.display = 'block';
  });
});

// Ensure the first tab is visible on page load
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('descriptionContent').style.display = 'block';
});


// Load curriculum data from `curriculum.json`
document.addEventListener('DOMContentLoaded', function() {
  fetch('json/curriculum.json')
    .then(response => response.json())
    .then(data => {
      console.log('Curriculum data loaded:', data); // Log the curriculum data to verify it is being loaded

      const container = document.querySelector('.curriculum-section');
      
      data.forEach(section => {
        const detailsElement = document.createElement('details');
        const summaryElement = document.createElement('summary');
        
        // Create the summary title and toggle icon
        summaryElement.innerHTML = `<span class="module-title">${section.title}</span><span class="toggle-icon">+</span>`;
        
        const lessonList = document.createElement('ul');
        lessonList.classList.add('lesson-list');
        
        // Loop through each lesson in the section
        section.lessons.forEach(lesson => {
          const listItem = document.createElement('li');
          let lessonContent = `<span class="lesson-icon">${getLessonIcon(lesson.type)}</span><span class="lesson-name">${lesson.name}</span>`;
          
          // If a link is available, make the lesson name a clickable link
          if (lesson.link) {
            lessonContent = `<a href="#" class="lesson-link" data-link="${lesson.link}">${lessonContent}</a>`;
          }
          
          listItem.innerHTML = lessonContent;
          lessonList.appendChild(listItem);
          
          // Create a video container for each lesson that has a link
          if (lesson.link) {
            const videoContainer = document.createElement('div');
            videoContainer.classList.add('video-container');
            videoContainer.style.display = 'none'; // Initially hide the video container
            listItem.appendChild(videoContainer);
          }
        });
        
        // Append the summary and lesson list to the details element
        detailsElement.appendChild(summaryElement);
        detailsElement.appendChild(lessonList);
        
        // Append the details element to the curriculum container
        container.appendChild(detailsElement);
      });
      
      // Add event listener to each lesson link to embed the video on click
      document.querySelectorAll('.lesson-link').forEach(link => {
        link.addEventListener('click', function(event) {
          event.preventDefault(); // Prevent the default link behavior
          
          const videoUrl = this.getAttribute('data-link');
          const videoContainer = this.closest('li').querySelector('.video-container');
          
          // Toggle the video container visibility and embed the video
          if (videoContainer.style.display === 'none') {
            videoContainer.style.display = 'block';
            videoContainer.innerHTML = `<iframe width="100%" height="400" src="${embedVideoUrl(videoUrl)}" frameborder="0" allowfullscreen></iframe>`;
          } else {
            videoContainer.style.display = 'none';
            videoContainer.innerHTML = ''; // Remove the embedded video
          }
        });
      });
      
      // Toggle the + and - icons on opening and closing the details elements
      document.querySelectorAll('.curriculum-section details').forEach(detail => {
        detail.addEventListener('toggle', function() {
          const icon = this.querySelector('.toggle-icon');
          icon.textContent = this.open ? '-' : '+';
        });
      });
    })
    .catch(error => console.error('Error loading curriculum:', error)); // Catch and log any errors during fetch
});

// Helper function to get the appropriate icon based on the lesson type
function getLessonIcon(type) {
  switch (type) {
    case 'lecture':
      return '🎓'; // Example icon for lecture
    case 'homework':
      return '📝'; // Example icon for homework
    case 'project':
      return '💻'; // Example icon for project
    case 'challenge':
      return '🚀'; // Example icon for challenge
    default:
      return '📚'; // Default icon
  }
}

// Convert video URL to embeddable format for YouTube or Google Drive
function embedVideoUrl(url) {
  // Check if the URL is a YouTube link
  if (url.includes('youtube.com')) {
    const videoId = url.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}`;
  
  // Check if the URL is a Google Drive link
  } else if (url.includes('drive.google.com')) {
    const fileId = url.match(/[-\w]{25,}/)[0];
    return `https://drive.google.com/file/d/${fileId}/preview`;
  
  // For other types of links, return the URL as is
  } else {
    return url;
  }
}

// Fetch reviews data from `reviews.json`
document.addEventListener('DOMContentLoaded', function() {
  fetch('json/reviews.json')
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
                <div class="student-title">${review.title}</div>
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
        let isExpanded = false;
        
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

// Load sidebar content from `sidebar.json`
// Load sidebar content from `sidebar.json`
document.addEventListener('DOMContentLoaded', function() {
  fetch('json/sidebar.json')
    .then(response => response.json())
    .then(data => {
      const sidebarData = data.sidebar;

      // Populate course information list
      const courseInfoList = document.getElementById('course-info');
      sidebarData.course_info.forEach(info => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<i class="${info.icon}"></i> ${info.label}`;
        courseInfoList.appendChild(listItem);
      });

      // Set price and subscription information
      document.getElementById('old-price').innerHTML = `<del>${sidebarData.price.old_price}</del>`;
      document.getElementById('new-price').textContent = sidebarData.price.new_price;
      document.getElementById('subscription-time').textContent = sidebarData.subscription_time;
      document.getElementById('subscribe-button').textContent = sidebarData.subscribe_button.text;
    })
    .catch(error => console.error('Error fetching sidebar data:', error));
});
