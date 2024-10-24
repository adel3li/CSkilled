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

// Fetch the description content from `description.json`
document.addEventListener('DOMContentLoaded', function () {
  fetch('description.json')
    .then(response => response.json())
    .then(data => {
      const descriptionContent = data.descriptionContent;
      const descriptionSection = document.getElementById('descriptionContent');
      
      const heading = document.createElement('h2');
      heading.textContent = descriptionContent.heading;
      descriptionSection.appendChild(heading);
      
      const paragraph = document.createElement('p');
      paragraph.innerHTML = descriptionContent.paragraph.replace(/\n/g, '<br>');
      descriptionSection.appendChild(paragraph);
      
      descriptionContent.details.forEach(detail => {
        const detailsElement = document.createElement('details');
        detailsElement.classList.add('course-details');
        detailsElement.open = true;
        
        const summary = document.createElement('summary');
        summary.innerHTML = `<b>${detail.summary}</b>`;
        detailsElement.appendChild(summary);
        
        if (detail.content) {
          const contentParagraph = document.createElement('p');
          contentParagraph.classList.add('course-content-section');
          contentParagraph.textContent = detail.content;
          detailsElement.appendChild(contentParagraph);
        }

        if (detail.goals) {
          const ul = document.createElement('ul');
          ul.classList.add('course-goals-details');
          detail.goals.forEach(goal => {
            const li = document.createElement('li');
            li.textContent = goal;
            ul.appendChild(li);
          });
          detailsElement.appendChild(ul);
        }

        if (detail.pros) {
          const ul = document.createElement('ul');
          ul.classList.add('course-pros-details');
          detail.pros.forEach(pro => {
            const li = document.createElement('li');
            li.textContent = pro;
            ul.appendChild(li);
          });
          detailsElement.appendChild(ul);
        }

        if (detail.requirements) {
          const ul = document.createElement('ul');
          ul.classList.add('course-requirements-details');
          detail.requirements.forEach(requirement => {
            const li = document.createElement('li');
            li.textContent = requirement;
            ul.appendChild(li);
          });
          detailsElement.appendChild(ul);
        }

        if (detail.note) {
          const noteParagraph = document.createElement('p');
          noteParagraph.textContent = detail.note;
          noteParagraph.classList.add('course-note');
          detailsElement.appendChild(noteParagraph);
        }

        descriptionSection.appendChild(detailsElement);
      });
    })
    .catch(error => console.error('Error fetching the description:', error));
});

// Load curriculum data from `curriculum.json`
document.addEventListener('DOMContentLoaded', function() {
  fetch('curriculum.json')
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

// Load instructor content from `json/instructor.json`
document.addEventListener('DOMContentLoaded', loadInstructorContent);

function loadInstructorContent() {
  fetch('json/instructor.json') // Fetch from the correct path
    .then(response => response.json())
    .then(data => {
      const instructorSection = document.querySelector('.instructor');

      // Create and append instructor heading
      const heading = document.createElement('h3');
      heading.textContent = data.instructor.name;
      instructorSection.appendChild(heading);

      // Create and append instructor image
      const img = document.createElement('img');
      img.src = data.instructor.image;
      img.alt = data.instructor.name;
      img.classList.add('instructor-image');
      instructorSection.appendChild(img);

      // Create and append instructor description paragraphs
      data.instructor.description.forEach(desc => {
        const paragraph = document.createElement('p');
        paragraph.innerHTML = desc; // Use innerHTML to allow HTML tags like <a>
        instructorSection.appendChild(paragraph);
      });
    })
    .catch(error => console.error('Error loading instructor content:', error));
}

// Fetch reviews data from `reviews.json`
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
                <div class="student-title">${review.title}</div>
              </div>
              <div class="star-rating">
                <span>${review.rating}</span>
              </div>
            </div>
            <div class="review-text ${isEnglish ? 'english' : 'arabic'}">
              <p data-full-text="${review.text}">${review.text.replace(/\n/g, '<br>')}</p>
              ${review.expandable && review.text.length > 100 ? '<button class="see-more">See more</button>' : ''}
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

// Load FAQ content from `json/faq.json`
document.addEventListener('DOMContentLoaded', loadFaqContent);

function loadFaqContent() {
  fetch('json/faq.json') // Fetch from the correct path
    .then(response => response.json())
    .then(data => {
      const faqList = document.getElementById('faqList'); // Target the correct container

      // Loop through the FAQ array and create question-answer pairs
      data.faq.forEach(item => {
        const questionElement = document.createElement('h4');
        questionElement.classList.add('faq-question');
        questionElement.textContent = item.question;

        const answerElement = document.createElement('p');
        answerElement.classList.add('faq-answer');
        answerElement.textContent = item.answer;
        answerElement.style.display = 'none'; // Hide the answer initially

        // Append the question and answer to the FAQ list
        faqList.appendChild(questionElement);
        faqList.appendChild(answerElement);

        // Add click event to toggle the answer visibility
        questionElement.addEventListener('click', () => {
          if (answerElement.style.display === 'block') {
            answerElement.style.display = 'none';
            questionElement.classList.remove('active');
          } else {
            answerElement.style.display = 'block';
            questionElement.classList.add('active');
          }
        });
      });
    })
    .catch(error => console.error('Error loading FAQ content:', error));
}

// Load payment content from `payment.json`
document.addEventListener('DOMContentLoaded', loadPaymentContent);
function loadPaymentContent() {
  fetch('payment.json')
    .then(response => response.json())
    .then(data => {
      const paymentDetails = document.getElementById('paymentDetails');
      const heading = document.createElement('h3');
      heading.textContent = data.heading;
      
      const paragraph = document.createElement('p');
      paragraph.textContent = data.paragraph;
      
      const stepsList = document.createElement('ul');
      data.steps.forEach(step => {
        const li = document.createElement('li');
        li.textContent = step;
        stepsList.appendChild(li);
      });
      
      const note = document.createElement('p');
      note.innerHTML = `<strong>ملاحظة:</strong> ${data.note}`;
      
      paymentDetails.appendChild(heading);
      paymentDetails.appendChild(paragraph);
      paymentDetails.appendChild(stepsList);
      paymentDetails.appendChild(note);
    })
    .catch(error => console.error('Error loading payment details:', error));
}

// Load sidebar content from `sidebar.json`
document.addEventListener('DOMContentLoaded', function() {
  fetch('sidebar.json')
    .then(response => response.json())
    .then(data => {
      const sidebarData = data.sidebar;
      
      const imageElement = document.getElementById('sidebar-image');
      imageElement.src = sidebarData.image.src;
      imageElement.alt = sidebarData.image.alt;
      
      const courseInfoList = document.getElementById('course-info');
      sidebarData.course_info.forEach(info => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<i class="${info.icon}"></i> ${info.label}`;
        courseInfoList.appendChild(listItem);
      });
      
      document.getElementById('old-price').innerHTML = `<del>${sidebarData.price.old_price}</del>`;
      document.getElementById('new-price').textContent = sidebarData.price.new_price;
      document.getElementById('subscription-time').textContent = sidebarData.subscription_time;
      document.getElementById('subscribe-button').textContent = sidebarData.subscribe_button.text;
    })
    .catch(error => console.error('Error fetching sidebar data:', error));
});

document.addEventListener('DOMContentLoaded', function() {
  const lazyImages = [].slice.call(document.querySelectorAll('img.lazy-image'));

  if ('IntersectionObserver' in window) {
    let lazyImageObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove('lazy-image');
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    lazyImages.forEach(function(lazyImage) {
      lazyImage.src = lazyImage.dataset.src;
    });
  }
});