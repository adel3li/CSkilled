// Global JavaScript

// Toggle mobile menu visibility when the hamburger icon is clicked
document.querySelector('.hamburger').addEventListener('click', function() {
  document.querySelector('.nav').classList.toggle('active');
});

// Close the mobile menu when a link is clicked
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', function() {
    document.querySelector('.nav').classList.remove('active');
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Lazy loading images
function lazyLoadImages() {
  const lazyImages = document.querySelectorAll('.lazy-image');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy-image');
        observer.unobserve(img);
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

// Load external CSS (for lazy loading of stylesheets)
function loadCSS(href, media = 'all') {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  link.media = media;
  document.getElementsByTagName("head")[0].appendChild(link);
}

// Load CSS on window load
window.onload = function() {
  loadCSS("styles.css");
};

// Add event listener to toggle "+" and "-" in details elements
document.querySelectorAll('details').forEach(detail => {
  detail.addEventListener('toggle', function() {
    const icon = this.querySelector('summary::before');
    icon.textContent = this.open ? '-' : '+';
  });
});