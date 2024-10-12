// Toggle mobile menu visibility when the hamburger icon is clicked
document.querySelector('.hamburger').addEventListener('click', function() {
  document.querySelector('.nav').classList.toggle('active');
});

// Close the mobile menu when a link is clicked
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', function() {
    // Close the mobile menu
    document.querySelector('.nav').classList.remove('active');

    // Scroll the page to the target section
    const targetId = this.getAttribute('href'); // Get the href value (e.g., #home)
    const targetElement = document.querySelector(targetId); // Select the target section

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Handle tab switching
document.querySelectorAll('.tab-button').forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    button.classList.add('active');
    
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.remove('active');
      content.style.display = 'none'; // Hide all content
    });
    
    // Show the clicked tab content
    const targetContent = button.id.replace('Tab', 'Content');
    const targetElement = document.getElementById(targetContent);
    targetElement.classList.add('active');
    targetElement.style.display = 'block'; // Show the selected content
  });
});

// Ensure the first tab is visible on page load
document.getElementById('descriptionContent').style.display = 'block';

// Lazy loading images
function lazyLoadImages() {
  const lazyImages = document.querySelectorAll('.lazy-image');

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;  // Swap data-src with src
        img.classList.remove('lazy-image'); // Optionally remove the lazy class once loaded
        observer.unobserve(img); // Stop observing once the image is loaded
      }
    });
  });

  lazyImages.forEach(image => {
    imageObserver.observe(image);
  });
}

// Call lazyLoadImages when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  lazyLoadImages();
});

// Description
document.addEventListener('DOMContentLoaded', function () {
  // Fetch the content from the description.json file
  fetch('description.json')
      .then(response => response.json())
      .then(data => {
          const descriptionContent = data.descriptionContent;

          // Get the descriptionContent section
          const descriptionSection = document.getElementById('descriptionContent');

          // Create and insert the heading
          const heading = document.createElement('h2');
          heading.textContent = descriptionContent.heading;
          descriptionSection.appendChild(heading);

          // Create and insert the paragraph
          const paragraph = document.createElement('p');
          paragraph.innerHTML = descriptionContent.paragraph.replace(/\n/g, '<br>');
          descriptionSection.appendChild(paragraph);

          // Create and insert the details elements
          descriptionContent.details.forEach(detail => {
              const detailsElement = document.createElement('details');
              detailsElement.classList.add('course-details');
              detailsElement.open = true;

              const summary = document.createElement('summary');
              summary.innerHTML = `<b>${detail.summary}</b>`;
              detailsElement.appendChild(summary);

              if (detail.content) {
                  const contentParagraph = document.createElement('p');
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

                  if (detail.note) {
                      const noteParagraph = document.createElement('p');
                      noteParagraph.textContent = detail.note;
                      detailsElement.appendChild(noteParagraph);
                  }
              }

              descriptionSection.appendChild(detailsElement);
          });
      })
      .catch(error => {
          console.error('Error fetching the JSON file:', error);
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
    // Fetch the JSON data
    const response = await fetch('instructor.json');
    const data = await response.json();

    // Get the instructor object
    const instructor = data.instructor;

    // Select the instructor section container
    const instructorSection = document.querySelector('.instructor');

    // Insert the instructor's details dynamically
    instructorSection.innerHTML = `
        <img src="${instructor.image}" alt="${instructor.name}" class="instructor-image">
        <div>
            <h3>${instructor.name}</h3>
            ${instructor.description.map(desc => `<p>${desc}</p>`).join('')}
        </div>
    `;
  } catch (error) {
    console.error('Error fetching the content:', error);
  }
}

// Call the function when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', fetchInstructorContent);

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
                              <!-- Name comes first -->
                              <span class="student-name">${review.name}</span>
                              <!-- Title comes below the name -->
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

// Fetch the sidebar data from the JSON file
fetch('sidebar.json')
  .then(response => response.json())
  .then(data => {
    const sidebarData = data.sidebar;

    // Populate the image
    const imageElement = document.getElementById('sidebar-image');
    imageElement.src = sidebarData.image.src;
    imageElement.alt = sidebarData.image.alt;

    // Populate the course info list
    const courseInfoList = document.getElementById('course-info');
    sidebarData.course_info.forEach(info => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `<i class="${info.icon}"></i> ${info.label}`;
      courseInfoList.appendChild(listItem);
    });

    // Populate the price
    document.getElementById('old-price').innerHTML = `<del>${sidebarData.price.old_price}</del>`;
    document.getElementById('new-price').textContent = sidebarData.price.new_price;

    // Populate the subscription time
    document.getElementById('subscription-time').textContent = sidebarData.subscription_time;

    // Populate the subscribe button
    document.getElementById('subscribe-button').textContent = sidebarData.subscribe_button.text;
  })
  .catch(error => {
    console.error('Error fetching sidebar data:', error);
  });

// lazy landing
function loadCSS(href, media) {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  link.media = media || "all";
  document.getElementsByTagName("head")[0].appendChild(link);
}

// Use this function to load additional CSS files when needed.
window.onload = function() {
  loadCSS("styles.css");
};