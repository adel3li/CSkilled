// Function to fetch JSON data and update the page content
function loadContent() {
fetch('data/content.json')
    .then(response => response.json())
    .then(data => {
          // Update Hero Section
        document.querySelector('.hero h1').textContent = data.hero.title;
        document.querySelector('.hero p').textContent = data.hero.description;
        document.querySelector('.cta-button').textContent = data.hero.ctaButton;
        document.querySelector('.hero-image').src = data.hero.image;

          // Update Testimonials Section
        const testimonialsGrid = document.querySelector('.testimonials-grid');
          testimonialsGrid.innerHTML = ''; // Clear existing content
        data.testimonials.forEach(testimonial => {
            const testimonialDiv = document.createElement('div');
            testimonialDiv.classList.add('testimonial');
            testimonialDiv.innerHTML = `
                <img src="${testimonial.image}" alt="Student Image">
                <p>${testimonial.text}</p>
                <strong>- ${testimonial.name}</strong>
            `;
            testimonialsGrid.appendChild(testimonialDiv);
        });

          // Update About Section
        document.querySelector('.about h2').textContent = data.about.title;
        document.querySelector('.about p').textContent = data.about.description;

          // Update Contact Section
        const form = document.querySelector('.contact form');
          form.innerHTML = ''; // Clear existing form
        data.contact.formFields.forEach(field => {
            const label = document.createElement('label');
            label.setAttribute('for', field.id);
            label.textContent = field.label;

            const input = document.createElement('input');
            input.setAttribute('type', field.type);
            input.setAttribute('id', field.id);
            input.setAttribute('name', field.id);
            if (field.required) {
                input.required = true;
            }

            form.appendChild(label);
            form.appendChild(input);
        });

          // Add submit button
        const submitButton = document.createElement('button');
        submitButton.setAttribute('type', 'submit');
        submitButton.textContent = 'إرسال';
        form.appendChild(submitButton);
    })
    .catch(error => {
        console.error('Error fetching JSON data:', error);
    });
}

// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', loadContent);