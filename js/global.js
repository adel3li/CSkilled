// Global JavaScript

document.addEventListener('DOMContentLoaded', function () {
  // Toggle mobile menu visibility when the hamburger icon is clicked
  const hamburger = document.querySelector('.hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', function () {
      const nav = document.querySelector('.nav');
      if (nav) nav.classList.toggle('active');
    });
  }

  // Close the mobile menu when a link is clicked
  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', function (event) {
      const nav = document.querySelector('.nav');
      if (nav) nav.classList.remove('active');
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        event.preventDefault();  // Prevent the default behavior to allow smooth scrolling
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Lazy loading images
  // lazyLoadImages();

  // Add event listener to toggle "+" and "-" in details elements
  // document.querySelectorAll('details').forEach(detail => {
  //   detail.addEventListener('toggle', function () {
  //     const icon = this.querySelector('summary::before');
  //     if (icon) icon.textContent = this.open ? '-' : '+';
  //   });
  // });
});


// Call lazyLoadImages when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  lazyLoadImages();
});

// Load external CSS (for lazy loading of styalesheets)
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
// document.querySelectorAll('details').forEach(detail => {
//   detail.addEventListener('toggle', function() {
//     const icon = this.querySelector('summary::before');
//     icon.textContent = this.open ? '-' : '+';
//   });
// });