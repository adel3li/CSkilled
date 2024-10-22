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
      const container = document.querySelector('.curriculum-section');
      
      data.forEach(section => {
        const detailsElement = document.createElement('details');
        const summaryElement = document.createElement('summary');
        summaryElement.innerHTML = `<span class="module-title">${section.title}</span><span class="toggle-icon">+</span>`;
        const lessonList = document.createElement('ul');
        lessonList.classList.add('lesson-list');
        
        section.lessons.forEach(lesson => {
          const listItem = document.createElement('li');
          let lessonContent = `<span class="lesson-icon">${getLessonIcon(lesson.type)}</span><span class="lesson-name">${lesson.name}</span>`;
          
          if (lesson.link) {
            lessonContent = `<a href="#" class="lesson-link" data-link="${lesson.link}">${lessonContent}</a>`;
          }
          
          listItem.innerHTML = lessonContent;
          lessonList.appendChild(listItem);
          
          const videoContainer = document.createElement('div');
          videoContainer.classList.add('video-container');
          videoContainer.style.display = 'none';
          listItem.appendChild(videoContainer);
        });
        
        detailsElement.appendChild(summaryElement);
        detailsElement.appendChild(lessonList);
        container.appendChild(detailsElement);
      });
      
      document.querySelectorAll('.lesson-link').forEach(link => {
        link.addEventListener('click', function(event) {
          event.preventDefault();
          const videoUrl = this.getAttribute('data-link');
          const videoContainer = this.closest('li').querySelector('.video-container');
          
          if (videoContainer.style.display === 'none') {
            videoContainer.style.display = 'block';
            videoContainer.innerHTML = `<iframe width="100%" height="400" src="${embedVideoUrl(videoUrl)}" frameborder="0" allowfullscreen></iframe>`;
          } else {
            videoContainer.style.display = 'none';
            videoContainer.innerHTML = '';
          }
        });
      });
      
      document.querySelectorAll('.curriculum-section details').forEach(detail => {
        detail.addEventListener('toggle', function() {
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
    return url;
  }
}

// Fetch instructor data from `instructor.json`
document.addEventListener('DOMContentLoaded', fetchInstructorContent);
async function fetchInstructorContent() {
  try {
    const response = await fetch('instructor.json');
    const data = await response.json();
    
    const instructor = data.instructor;
    const instructorSection = document.querySelector('.instructor');
    
    instructorSection.innerHTML = `
      <img src="${instructor.image}" alt="${instructor.name}" class="instructor-image">
      <div>
        <h3>${instructor.name}</h3>
        ${instructor.description.map(desc => `<p>${desc}</p>`).join('')}
      </div>
    `;
  } catch (error) {
    console.error('Error fetching the instructor content:', error);
  }
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